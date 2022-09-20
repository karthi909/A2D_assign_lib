const bookModel = require('../Model/bookModel')



//Books Creation
const createBook = async (req, res)=>{
    let data = req.body

    let {title, authorName, ISBN, releasedAt, bookPrice} = data
    
    const newBook = await bookModel.create(data)

    return res.status(201).send({msg: newBook})

};


// Books details in Library
const getDts = async (req, res)=>{
    const books = await bookModel.find()
    let totalNumberOfBooks = books.length
    let issuedBooks = []
    for(let i=0;i<books.length;i++){
        if(books[i].isIssued === true){
            issuedBooks.push(books[i])
        }
    }
    let totalissuedBooks = issuedBooks.length
    let totalBooksInLib = totalNumberOfBooks-totalissuedBooks

    return res.status(200).send({msg:{
        Total_Books: totalNumberOfBooks,
        Total_Issued_Books: totalissuedBooks,
        Total_BooksIn_library:totalBooksInLib,
        Issued_Books:issuedBooks
    }})
}

module.exports.createBook = createBook;
module.exports.getDts = getDts;