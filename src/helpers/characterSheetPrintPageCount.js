const characterSheetPrintPageCount = () => {
  const a4UsablePageHeight = 1100;
  const characterSheetElement = document.querySelector('.character-sheet');

  let pageCount = 1;

  if (characterSheetElement) {
    const characterSheetElementHeight = characterSheetElement.offsetHeight;
    pageCount = Math.ceil(characterSheetElementHeight / a4UsablePageHeight);
  }

  return pageCount;
};

export default characterSheetPrintPageCount;
