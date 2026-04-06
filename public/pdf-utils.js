window.pdfUtils = {
  async readPdfFile(file) {
    if (!file) {
      throw new Error("PDFファイルを選んでください。");
    }

    if (file.type && file.type !== "application/pdf") {
      throw new Error("PDFファイルのみアップロードできます。");
    }

    const pdfBase64 = await fileToBase64(file);

    return {
      fileName: file.name,
      mimeType: file.type || "application/pdf",
      pdfBase64,
    };
  },
};

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result || "");
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64);
    };

    reader.onerror = () => {
      reject(new Error("PDFの読み込みに失敗しました。"));
    };

    reader.readAsDataURL(file);
  });
}
