const step3Shared = window.slideAppShared;

const slidesOutputElement = document.getElementById("slides-output");
const step3ExtractButton = document.getElementById("step3-extract-button");
const step3RegenerateButton = document.getElementById("step3-regenerate-button");
const step3CopyButton = document.getElementById("step3-copy-button");
const step3SaveButton = document.getElementById("step3-save-button");
const step3StatusElement = document.getElementById("step3-status");
const step3FiguresOutputElement = document.getElementById("step3-figures-output");
const step3OutputElement = document.getElementById("step3-output");

bootstrapStep3();

step3ExtractButton.addEventListener("click", async () => {
  const step2Markdown = slidesOutputElement.value.trim();
  const file = step3Shared.getStep3PdfFile();
  const model = step3Shared.modelField.value.trim();
  const baseName = step3Shared.slidesBaseNameInput.value.trim() || step3Shared.getDefaultBaseName();

  if (!file) {
    setStep3Status("Step 3用のPDFファイルを選んでください。Step 3欄が未選択ならStep 2欄のPDFでも使えます。", true);
    return;
  }

  if (!isUsableStep2Markdown(step2Markdown)) {
    setStep3Status("先にStep 2のMarkdownを生成するか、Step 2欄を直接編集してください。", true);
    return;
  }

  setStep3Loading({ extracting: true, regenerating: false });
  setStep3Status("図プレースホルダをもとに、論文PDFから図を抽出しています...", false);
  step3FiguresOutputElement.value = "図抽出を実行しています...";
  step3OutputElement.value = "まだ画像付き版のMarkdownはありません。";

  try {
    const extractedPdf = await window.pdfUtils.extractImagesFromPdf(file);
    const response = await fetch("/api/extract-figures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        step2Markdown,
        baseName,
        fileName: extractedPdf.fileName,
        extractedPages: extractedPdf.extractedPages,
        model,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "図抽出に失敗しました。");
    }

    step3FiguresOutputElement.value = JSON.stringify(data.extractedFigures, null, 2);
    const resolvedCount = Array.isArray(data.extractedFigures)
      ? data.extractedFigures.filter((figure) => figure.found).length
      : 0;
    setStep3Status(`完了: PDF内画像から ${resolvedCount}件の図を抽出しました。続けて再生成できます。`, false);
  } catch (error) {
    step3FiguresOutputElement.value = "エラーが発生しました。";
    setStep3Status(error.message || "不明なエラーが発生しました。", true);
  } finally {
    setStep3Loading({ extracting: false, regenerating: false });
  }
});

step3RegenerateButton.addEventListener("click", async () => {
  const step2Markdown = slidesOutputElement.value.trim();
  const model = step3Shared.modelField.value.trim();

  if (!isUsableStep2Markdown(step2Markdown)) {
    setStep3Status("先にStep 2のMarkdownを生成するか、Step 2欄を直接編集してください。", true);
    return;
  }

  let extractedFigures;

  try {
    extractedFigures = parseExtractedFigures(step3FiguresOutputElement.value);
  } catch (error) {
    setStep3Status(error.message, true);
    return;
  }

  setStep3Loading({ extracting: false, regenerating: true });
  setStep3Status("抽出結果を使って、画像付き版のMarp Markdownを再生成しています...", false);
  step3OutputElement.value = "Step 3を再生成しています...";

  try {
    const response = await fetch("/api/regenerate-step3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        step2Markdown,
        extractedFigures,
        model,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Step 3の再生成に失敗しました。");
    }

    step3OutputElement.value = data.output;
    setStep3Status(`完了: ${data.resolvedFigureCount}件の図を使って画像付き版を生成しました。`, false);
  } catch (error) {
    step3OutputElement.value = "エラーが発生しました。";
    setStep3Status(error.message || "不明なエラーが発生しました。", true);
  } finally {
    setStep3Loading({ extracting: false, regenerating: false });
  }
});

step3CopyButton.addEventListener("click", async () => {
  await step3Shared.copyOutput({
    text: step3OutputElement.value.trim(),
    emptyMessage: "まだ画像付き版のMarkdownはありません。",
    onSuccess: () => setStep3Status("Step 3のMarkdownをコピーしました。", false),
    onError: (message) => setStep3Status(message, true),
  });
});

step3SaveButton.addEventListener("click", async () => {
  await step3Shared.saveMarkdownToData({
    baseName: step3Shared.slidesBaseNameInput.value.trim(),
    suffix: "step3",
    text: step3OutputElement.value.trim(),
    onSuccess: (savedPath, normalizedBaseName) => {
      step3Shared.slidesBaseNameInput.value = normalizedBaseName;
      setStep3Status(`${savedPath} に保存しました。`, false);
    },
    onError: (message) => setStep3Status(message, true),
  });
});

document.addEventListener("step2:updated", () => {
  resetStep3Outputs();
  setStep3Status("Step 2が更新されました。必要なら図抽出からやり直してください。", false);
});

function bootstrapStep3() {
  resetStep3Outputs();
}

function resetStep3Outputs() {
  step3FiguresOutputElement.value = "まだ図抽出はありません。";
  step3OutputElement.value = "まだ画像付き版のMarkdownはありません。";
}

function parseExtractedFigures(rawText) {
  const trimmed = rawText.trim();

  if (!trimmed || trimmed === "まだ図抽出はありません。" || trimmed === "図抽出を実行しています..." || trimmed === "エラーが発生しました。") {
    throw new Error("先に図抽出を実行してください。");
  }

  let parsed;

  try {
    parsed = JSON.parse(trimmed);
  } catch {
    throw new Error("図抽出結果のJSONを読み取れませんでした。内容を確認してください。");
  }

  if (!Array.isArray(parsed)) {
    throw new Error("図抽出結果はJSON配列である必要があります。");
  }

  const resolvedFigures = parsed.filter((figure) => figure && figure.found);

  if (resolvedFigures.length === 0) {
    throw new Error("抽出結果に使える図がありません。図抽出結果を見直してください。");
  }

  return parsed;
}

function isUsableStep2Markdown(text) {
  return Boolean(text) && text !== "まだMarp Markdownはありません。" && text !== "エラーが発生しました。";
}

function setStep3Loading({ extracting, regenerating }) {
  const isLoading = extracting || regenerating;
  step3ExtractButton.disabled = isLoading;
  step3RegenerateButton.disabled = isLoading;
  step3CopyButton.disabled = isLoading;
  step3SaveButton.disabled = isLoading;
  step3Shared.slidePdfFileInput.disabled = isLoading;
  step3Shared.step3PdfFileInput.disabled = isLoading;
  step3Shared.slidesBaseNameInput.disabled = isLoading;
}

function setStep3Status(message, isError) {
  step3StatusElement.textContent = message;
  step3StatusElement.dataset.error = isError ? "true" : "false";
}
