const modelField = document.getElementById("model");
const step1OutputElement = document.getElementById("output");
const slideSourceInput = document.getElementById("slide-source");
const slidesBaseNameInput = document.getElementById("slides-base-name");
const slidePdfFileInput = document.getElementById("slide-pdf-file");
const step3PdfFileInput = document.getElementById("step3-pdf-file");

let sourceTouched = false;

bootstrapSlideShared();

function bootstrapSlideShared() {
  if (slideSourceInput && step1OutputElement) {
    slideSourceInput.addEventListener("input", () => {
      sourceTouched = slideSourceInput.value.trim().length > 0;
    });

    syncStep1OutputToSlideSource();
    observeStep1Output();
  }

  if (slidePdfFileInput) {
    slidePdfFileInput.addEventListener("change", autofillBaseNameIfNeeded);
  }

  if (step3PdfFileInput) {
    step3PdfFileInput.addEventListener("change", autofillBaseNameIfNeeded);
  }

  if (slidesBaseNameInput && !slidesBaseNameInput.value.trim()) {
    slidesBaseNameInput.value = getDefaultBaseName();
  }
}

function autofillBaseNameIfNeeded() {
  if (slidesBaseNameInput && !slidesBaseNameInput.value.trim()) {
    slidesBaseNameInput.value = getDefaultBaseName();
  }
}

function observeStep1Output() {
  const observer = new MutationObserver(() => {
    syncStep1OutputToSlideSource();
  });

  observer.observe(step1OutputElement, {
    childList: true,
    characterData: true,
    subtree: true,
  });
}

function syncStep1OutputToSlideSource() {
  if (sourceTouched && slideSourceInput.value.trim()) {
    return;
  }

  const text = step1OutputElement.textContent.trim();

  if (!text || text === "まだ結果はありません。" || text === "Geminiが論文を読んでいます..." || text === "エラーが発生しました。") {
    return;
  }

  slideSourceInput.value = text;
}

function getStep2PdfFile() {
  return slidePdfFileInput?.files?.[0] || null;
}

function getStep3PdfFile() {
  return step3PdfFileInput?.files?.[0] || getStep2PdfFile();
}

function getDefaultBaseName() {
  const file = getStep3PdfFile() || getStep2PdfFile();

  if (file?.name) {
    return file.name.replace(/\.pdf$/i, "");
  }

  return "sample";
}

async function copyOutput({ text, emptyMessage, onSuccess, onError }) {
  if (!text || text === emptyMessage || text === "エラーが発生しました。") {
    onError("コピーできるMarkdownがまだありません。");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    onSuccess();
  } catch {
    onError("クリップボードへのコピーに失敗しました。");
  }
}

async function saveMarkdownToData({ baseName, suffix, text, onSuccess, onError }) {
  if (!text || text === "まだMarp Markdownはありません。" || text === "まだ画像付き版のMarkdownはありません。" || text === "エラーが発生しました。") {
    onError("保存できるMarkdownがまだありません。");
    return;
  }

  if (!baseName) {
    onError("保存ベース名を入力してください。");
    return;
  }

  try {
    const response = await fetch("/api/save-slide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: `${baseName}-${suffix}`,
        content: text,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "data/ への保存に失敗しました。");
    }

    onSuccess(data.savedPath, data.fileName.replace(new RegExp(`-${suffix}\\.md$`, "i"), ""));
  } catch (error) {
    onError(error.message || "不明なエラーが発生しました。");
  }
}

function formatToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}

window.slideAppShared = {
  modelField,
  slideSourceInput,
  slidesBaseNameInput,
  slidePdfFileInput,
  step3PdfFileInput,
  getStep2PdfFile,
  getStep3PdfFile,
  getDefaultBaseName,
  copyOutput,
  saveMarkdownToData,
  formatToday,
};
