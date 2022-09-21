const bookModel = require('../Model/bookModel');
const Validator = require("../validation/validator")




//Books Creation
const createBook = async (req, res) => {

    try {
        let data = req.body

        let { title, authorName, ISBN, releasedAt, bookPrice } = data

        if (!Validator.isValidRequestBody(data)) return res.status(400).send({ status: false, msg: "please provide some data" });

        if (!title) return res.status(400).send({ status: false, msg: "please provide title field." });
        if (!Validator.isValid(title)) return res.status(400).send({ status: false, msg: "please provide valid title." });
        const duplicateTitle = await bookModel.findOne({ title: title });
        if (duplicateTitle) return res.status(400).send({ status: false, msg: "Title already exists." });

        if (!authorName) return res.status(400).send({ status: false, msg: "please provide title field." });
        if (!Validator.isValid(authorName)) return res.status(400).send({ status: false, msg: "please provide valid title." });

        if (!ISBN) return res.status(400).send({ status: false, msg: "please provide ISBN field." });
        if (!/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(ISBN)) return res.status(400).send({ status: false, msg: "ISBN is not correct." });
        const duplicateISBN = await bookModel.findOne({ ISBN: ISBN });
        if (duplicateISBN) return res.status(400).send({ status: false, msg: "ISBN already exists" });

        if (!releasedAt) return res.status(400).send({ status: false, msg: "please provide releasedAt field." });
        if (!Validator.isValid(releasedAt)) return res.status(400).send({ status: false, msg: "please provide valid title." });

        if (!Validator.isValid(bookPrice)) return res.status(400).send({ status: false, msg: "Price or Price feild is requried" })
        if (bookPrice <= 0) return res.status(400).send({ status: false, msg: "Price have to be more than Rupees O [Zero]" })

        const newBook = await bookModel.create(data)

        return res.status(201).send({ msg: newBook })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

};


// Books details in Library
const getDts = async (req, res) => {
    try {
        let libId = req.params.libId

        if (req.libId != libId) {
            return res.send({ msg: "Not Authorized" })
        }


        const books = await bookModel.find()
        let totalNumberOfBooks = books.length
        let issuedBooks = []
        for (let i = 0; i < books.length; i++) {
            if (books[i].isIssued === true) {
                issuedBooks.push(books[i])
            }
        }
        let totalissuedBooks = issuedBooks.length
        let totalBooksInLib = totalNumberOfBooks - totalissuedBooks

        return res.status(200).send({
            msg: {
                Total_Books: totalNumberOfBooks,
                Total_Issued_Books: totalissuedBooks,
                Total_BooksIn_library: totalBooksInLib,
                Issued_Books: issuedBooks
            }
        })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const updateBook = async (req, res) => {
    try {
        let bookId = req.params.bookid
        if (!Validator.isValidObjectId(bookId)) { return res.status(400).send({ status: false, message: "bookId  is not valid" }) }
        let data = req.body;
        let { title, authorName, ISBN, releasedAt, isDeleted, bookPrice } = data;

        if (!Validator.isValidString(title)) return res.status(400).send({ status: false, msg: "please provide valid details." });
        const duplicateTitle = await bookModel.findOne({ title: title });
        if (duplicateTitle) return res.status(400).send({ status: false, msg: "Title already exists." });

        if (!Validator.isValidString(authorName)) return res.status(400).send({ status: false, msg: "please provide valid details." });

        if(ISBN){
        if (!/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(ISBN)) return res.status(400).send({ status: false, msg: "ISBN is not correct." });
        const duplicateISBN = await bookModel.findOne({ ISBN: ISBN });
        if (duplicateISBN) return res.status(400).send({ status: false, msg: "ISBN already exists" });
        }

       if(isDeleted || releasedAt ){
        if (!Validator.isValidString(releasedAt)) return res.status(400).send({ status: false, msg: "please provide valid details." });

        if( typeof isDeleted !== 'boolean') return res.status(400).send({ status: false, msg: "please provide valid details." })
       }
        
       if(bookPrice){
        if (!Validator.isValid(bookPrice)) return res.status(400).send({ status: false, msg: "Price or Price feild is requried" })
        if (bookPrice < 0) return res.status(400).send({ status: false, msg: "Price have to be more than Rupees O [Zero]" })
       }



        let updatedBook = await bookModel.findByIdAndUpdate({ _id: bookId },
            {
                title: title,
                authorName: authorName,
                ISBN: ISBN,
                releasedAt: releasedAt,
                isDeleted: isDeleted,
                bookPrice: bookPrice
            }, { new: true });
        

        return res.status(201).send({ status: true, msg: "Successful", Data: updatedBook })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}

const deleteBooks = async (req, res) => {
    try {
        let bookId = req.params.bookid
       
        if(!bookId) return res.status(400).send({msg:"please provide bookId"})
        if (!Validator.isValidObjectId(bookId)) { return res.status(400).send({ status: false, message: "bookId  is not valid" }) }
    

        await bookModel.releasedAt({ _id: bookId, }, { isDeleted: true })


        return res.status(200).send({ status: true, msg: "Deleted Successfully" })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports.createBook = createBook;
module.exports.getDts = getDts;
module.exports.updateBook = updateBook;
module.exports.deleteBooks = deleteBooks;