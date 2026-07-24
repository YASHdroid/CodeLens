const aiService = require("../services/aiService");
const Review = require("../models/Review");
async function reviewCode(req, res) {
const { code, language } = req.body;

  if (!code) {
    return res.status(400).json({
      error: "Code is required",
    });
  }

  try {

     const review = await aiService.reviewCode(code);
     const savedReview = await Review.create({

      userId: req.user.id,
      title : "New Review",
      language : language || "JavaScript",
      code : code,
      review : review,
     });

      return res.status(201).json({
            message: "Review generated successfully",
            review: savedReview,
        });

  }catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to review code",
        });
    }
}

async function getReviewHistory(req , res) {

try{

   
  const reviews = await Review.find({
    userId: req.user.id
}).sort({createdAt: -1 })

return res.status(200).json(reviews);

} catch(error){

  console.error(error);

  return res.status(500).json({

    error : "Failed to fetch History"
  })
}
  
}

async function getReviewById(req , res) {

  try {
    const review = await Review.findOne({
    _id: req.params.id,
    userId: req.user.id
});
    if(!review){

      return res.status(404).json({

        error : "Review not found"
      });
    }

     return res.status(200).json(review);
  }catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to fetch review"
        });
    }
  
}

async function deleteReview(req, res) {
    try {

        const review = await Review.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!review) {
            return res.status(404).json({
                error: "Review not found"
            });
        }

        return res.status(200).json({
            message: "Review deleted successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Failed to delete review"
        });

    }
}

module.exports = {
  reviewCode, getReviewHistory ,   getReviewById ,  deleteReview
};