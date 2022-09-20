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

const updateBook = async (req, res)=>{
    let bookId = req.params.bookid
    let data = req.body;
    let {title, authorName, ISBN, releasedAt, isDeleted, bookPrice } = data;

    let updatedBook = await bookModel.findByIdAndUpdate({ _id: bookId},
        {
            title:title,
            authorName: authorName,
            ISBN: ISBN,
            releasedAt: releasedAt,
            isDeleted: isDeleted,
            bookPrice: bookPrice
        },{ new: true });
        console.log(updatedBook)
    
    return res.status(201).send({status:true, msg:"Successful", Data: updatedBook })


}

const deleteBooks = async (req, res)=>{
    let bookId = req.params.bookid

    let dltBook = await bookModel.findByIdAndUpdate({_id: bookId},{isDeleted: true})

    return res.status(200).send({status: true, msg:"Deleted Successfully"})
}


module.exports.createBook = createBook;
module.exports.getDts = getDts;
module.exports.updateBook = updateBook;
module.exports.deleteBooks = deleteBooks;