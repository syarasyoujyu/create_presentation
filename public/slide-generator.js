const slidesForm = document.getElementById("slides-form");
const eventNameInput = document.getElementById("event-name");
const eventDateInput = document.getElementById("event-date");
const affiliationInput = document.getElementById("affiliation");
const presenterNameInput = document.getElementById("presenter-name");
const slideSourceInput = document.getElementById("slide-source");
const slideFlowInput = document.getElementById("slide-flow");
const slidesStatusElement = document.getElementById("slides-status");
const slidesOutputElement = document.getElementById("slides-output");
const slidesSubmitButton = document.getElementById("slides-submit-button");
const slidesCopyButton = document.getElementById("slides-copy-button");
const slidesSaveButton = document.getElementById("slides-save-button");
const slidesFileNameInput = document.getElementById("slides-file-name");
const slidePdfFileInput = document.getElementById("slide-pdf-file");
const step1OutputElement = document.getElementById("output");
const modelField = document.getElementById("model");

let sourceTouched = false;

bootstrapSlideStep();

slidesForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const analysis = slideSourceInput.value.trim();
  const slideFlow = slideFlowInput.value.trim();
  const model = modelField.value.trim();
  const eventName = eventNameInput.value.trim() || "論文紹介";
  const eventDate = eventDateInput.value.trim() || formatToday();
  const affiliation = affiliationInput.value.trim() || "所属未入力";
  const presenterName = presenterNameInput.value.trim() || "発表者未入力";
  const file = slidePdfFileInput.files?.[0];

  if (!file) {
    setSlidesStatus("Step 2用のPDFファイルを選んでください。", true);
    return;
  }

  setSlidesLoading(true);
  setSlidesStatus("PDFを参照しながらMarp Markdownを生成しています...", false);
  slidesOutputElement.textContent = "Geminiがスライド原稿を組み立てています...";

  try {
    const pdfData = await window.pdfUtils.readPdfFile(file);
    const response = await fetch("/api/slides", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        analysis,
        slideFlow,
        fileName: pdfData.fileName,
        mimeType: pdfData.mimeType,
        pdfBase64: pdfData.pdfBase64,
        model,
        eventName,
        eventDate,
        affiliation,
        presenterName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Marp Markdownの生成に失敗しました。");
    }

    slidesOutputElement.textContent = data.output;
    setSlidesStatus(`完了: ${data.model} でMarp Markdownを生成しました。`, false);
  } catch (error) {
    slidesOutputElement.textContent = "エラーが発生しました。";
    setSlidesStatus(error.message || "不明なエラーが発生しました。", true);
  } finally {
    setSlidesLoading(false);
  }
});

slidesCopyButton.addEventListener("click", async () => {
  const text = slidesOutputElement.textContent.trim();

  if (!text || text === "まだMarp Markdownはありません。") {
    setSlidesStatus("コピーできるMarp Markdownがまだありません。", true);
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    setSlidesStatus("Marp Markdownをコピーしました。", false);
  } catch {
    setSlidesStatus("クリップボードへのコピーに失敗しました。", true);
  }
});

slidesSaveButton.addEventListener("click", async () => {
  const text = slidesOutputElement.textContent.trim();
  const fileName = slidesFileNameInput.value.trim();

  if (!text || text === "まだMarp Markdownはありません。") {
    setSlidesStatus("保存できるMarp Markdownがまだありません。", true);
    return;
  }

  if (!fileName) {
    setSlidesStatus("保存ファイル名を入力してください。", true);
    return;
  }

  try {
    const response = await fetch("/api/save-slide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName,
        content: text,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "data/ への保存に失敗しました。");
    }

    slidesFileNameInput.value = data.fileName.replace(/\.md$/i, "");
    setSlidesStatus(`${data.savedPath} に保存しました。`, false);
  } catch (error) {
    setSlidesStatus(error.message || "不明なエラーが発生しました。", true);
  }
});

slideSourceInput.addEventListener("input", () => {
  sourceTouched = slideSourceInput.value.trim().length > 0;
});

slidePdfFileInput.addEventListener("change", () => {
  if (!slidesFileNameInput.value.trim()) {
    slidesFileNameInput.value = getDefaultSlideFileName();
  }
});

function bootstrapSlideStep() {
  if (!eventDateInput.value.trim()) {
    eventDateInput.value = formatToday();
  }

  if (!slidesFileNameInput.value.trim()) {
    slidesFileNameInput.value = getDefaultSlideFileName();
  }

  syncStep1OutputToSlideSource();
  observeStep1Output();
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

function setSlidesLoading(isLoading) {
  slidesSubmitButton.disabled = isLoading;
  slidesCopyButton.disabled = isLoading;
  slidesSaveButton.disabled = isLoading;
  slidePdfFileInput.disabled = isLoading;
  slidesFileNameInput.disabled = isLoading;
  eventNameInput.disabled = isLoading;
  eventDateInput.disabled = isLoading;
  affiliationInput.disabled = isLoading;
  presenterNameInput.disabled = isLoading;
  slideSourceInput.disabled = isLoading;
  slideFlowInput.disabled = isLoading;
}

function setSlidesStatus(message, isError) {
  slidesStatusElement.textContent = message;
  slidesStatusElement.dataset.error = isError ? "true" : "false";
}

function formatToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}

function getDefaultSlideFileName() {
  const file = slidePdfFileInput.files?.[0];

  if (file?.name) {
    return file.name.replace(/\.pdf$/i, "");
  }

  return "sample";
}
