function doPost(e) {
  const folderId = "###"; // Folder ID which is used for putting the file.

  const blob = Utilities.newBlob(
    JSON.parse(e.postData.contents),
    e.parameter.mimeType,
    e.parameter.filename
  );
  const file = DriveApp.getFolderById(folderId || "root").createFile(blob);
  const responseObj = {
    filename: file.getName(),
    fileId: file.getId(),
    fileUrl: file.getUrl(),
  };
  var cellFormula =
    'hyperlink("' + file.getUrl() + '";"' + file.getName() + '")';
  var activeSheet = SpreadsheetApp.getActiveSheet();
  var selection = activeSheet.getSelection();
  var cell = selection.getCurrentCell();
  cell.setFormula(cellFormula);

  return ContentService.createTextOutput(
    JSON.stringify(responseObj)
  ).setMimeType(ContentService.MimeType.JSON);
}
