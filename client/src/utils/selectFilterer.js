/**
 * 
 * @param { string } selectedElement 
 * @param {array} arrayToFilter
 * @returns { array } filtered array 
 */
export default function selectFilterer(selectedElement, arrayToFilter){
    const elements = {
      allbooks: 'allbooks',
      booksreturned: 'booksreturned',
      mostborrowedbooks: 'mostborrowedbooks',
      pendingreturn: 'pendingreturn',
      unpublishedbooks: 'unpublishedbooks'
    }
    const result = [];

    switch(selectedElement) {
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

// if(this.state.selectedValue ==='allbooks') {
//   this.setState({allbooks: this.props.updatedBooks});
//   let all = this.state.allbooks.filter(book => book.visibility === true);
//   console.log(all)
//   this.setState({allbooks:all});
// } else if (this.state.selectedValue === 'booksreturned') {
//   console.log('create this API');
// } else if (this.state.selectedValue === 'mostborrowedbooks') {
//   console.log('create this api');
// } else if (this.state.selectedValue === 'pendingreturn') {
//   console.log('create this api');
// } else if (this.state.selectedValue === 'unpublishedbooks') {
//   this.setState({allbooks: this.state.allDatabaseBooks})
//   let unpublishedbooks = this.state.allDatabaseBooks.filter(book => book.visibility === false);
//   console.log(unpublishedbooks);
//   this.setState({allbooks: unpublishedbooks});
// } else {
//   this.setState({allbooks: filterable});
// }