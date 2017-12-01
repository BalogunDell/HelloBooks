/**
 * 
 * @param { string } selectedElement 
 * @param {array} arrayToFilter
 * @returns { array } filtered array 
 */
export default function selectFilterer(selectedElement, arrayToFilter) {
  const elements = {
    allbooks: 'allbooks',
    booksreturned: 'booksreturned',
    mostborrowedbooks: 'mostborrowedbooks',
    pendingreturn: 'pendingreturn',
    unpublishedbooks: 'unpublishedbooks'
  };

  switch (selectedElement) {
    case elements.allbooks:
      const filtered = arrayToFilter.filter(book => book.visibility == true);
      return filtered;
      break;
        case elements.booksreturned:
          () => {
            const filtered = arrayToFilter.filter(book => book.returnstatus == true);
            return filtered
          };
          break;
        case elements.pendingreturn:
          () => {
            const filtered = arrayToFilter.filter(book => book.returnstatus == false);
            return filtered
          };
          break;
        case elements.unpublishedbooks: 
          () => {
            const filtered = arrayToFilter.filter(book => book.visibility == false);
            return filtered
          }            
        default: 
          return arrayToFilter
    }
} 
