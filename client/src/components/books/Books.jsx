import React from 'react';
/**
 * @class Books
 * @classdesc returns the Books component
 */
const Books = () => {
  const book1 = 'https://artofproblemsolving.com/m/store/images/otherbooks.png';
    return(
      <div className="container home-books">
        <div className="row">
         <div className="col s12 books-holder-title">
            <h1>Trending Books</h1>
         </div>
      </div>
        <div className="row books-holder">
          <div className="col s12 m3 lg3">
            <div className="book-holder-prot">
              <div className="item book-title center">
               <h6><strong>Learn Angular</strong></h6>
              </div>
              <div className="item img-holder center">
               <img src= { book1 } alt="" className="materialboxed"/>
                <div className="img-overlay">
                  <p>Learn Angular 2 by <strong>Abbey Balogun</strong></p>
                </div>
              </div>
              <div className="dets">
               <a href="bookdetails.html"><button type="button" className="btn waves-effect waves-teal">Details</button></a>
               <p>2 Available</p>
              </div>
            </div>
          </div>
          {/* second book  */}
          <div className="col s12 m3 lg3">
            <div className="book-holder-prot">
              <div className="item book-title center">
               <h6><strong>Learn Angular</strong></h6>
              </div>
              <div className="item img-holder center">
               <img src= { book1 } alt="" className="materialboxed" />
                <div className="img-overlay">
                  <p>Learn Angular 2 by <strong>Abbey Balogun</strong></p>
                </div>
              </div>
              <div className="dets">
               <a href="bookdetails.html"><button type="button" className="btn waves-effect waves-teal">Details</button></a>
               <p>2 Available</p>
              </div>
            </div>
          </div>

          {/*third book  */}
          <div className="col s12 m3 lg3">
            <div className="book-holder-prot">
              <div className="item book-title center">
               <h6><strong>Learn Angular</strong></h6>
              </div>
              <div className="item img-holder center">
               <img src= { book1 } alt="" className="materialboxed"/>
                <div className="img-overlay">
                  <p>Learn Angular 2 by <strong>Abbey Balogun</strong></p>
                </div>
              </div>
              <div className="dets">
               <a href="bookdetails.html"><button type="button" className="btn waves-effect waves-teal">Details</button></a>
               <p>2 Available</p>
              </div>
            </div>
          </div>
          {/* fourth book  */}
          <div className="col s12 m3 lg3">
            <div className="book-holder-prot">
              <div className="item book-title center">
               <h6><strong>Learn Angular</strong></h6>
              </div>
              <div className="item img-holder center">
               <img src= { book1 } alt="" className="materialboxed"/>
                <div className="img-overlay">
                  <p>Learn Angular 2 by <strong>Abbey Balogun</strong></p>
                </div>
              </div>
              <div className="dets">
               <a href="bookdetails.html"><button type="button" className="btn waves-effect waves-teal">Details</button></a>
               <p>2 Available</p>
              </div>
            </div>
          </div>
        </div> 
      </div>
    );
  };

  export default Books;