const { Product } = require('../models/product');
const user = require('../models/user');

const asyncHandler = require('express-async-handler');

exports.getAllProducts = (req, res) => {
    Product.find()
        .then((result) => {
            res.render('pages/products', {
                user: req.session.user == undefined ?undefined : req.session.user,
                products: result,
                Id: req.params.id,

            }
            );
        })
        .catch((err) => {
            console.log('error loading');
        });
};

exports.deleteProduct = (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            if (product) {
                console.log('Product was successfully removed');
                return res.status(200);
            } else {
                console.log('could not remove product');
                return res.status(404);
            }
        })
        .catch((err) => {
            console.log('could not remove product');
            return res.status(400);
        });
}; 

// exports.productDetails = asyncHandler(async (req, res) => {
//     const prod = await Product.findById(req.params.id);

//     if (!prod) {
//         console.log(
//             'The Product with the given ID was not found please check for the validity of the ID'
//         );
//         return res.status(500);
//     }
//     res.render('pages/productDetails', {
//         products: prod,
//     });
// });

//diamond

exports.getDrings = (req, res) => {
    var body = `The brilliance and sparkle of a diamond is unmatched, creating a stunning statement piece that will make any outfit shine. From delicate solitaires to intricate halo designs, there are endless options for diamond rings to suit every taste and budget. Whether you prefer a classic round cut or a unique fancy shape, a diamond ring is a timeless investment that will be treasured for generations to come.`;
    Product.find({ material: 'diamond', category: 'ring' })
        .then((result) => {
            res.render('pages/products', {
                user: req.session.user == undefined ?undefined : req.session.user,
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log('error loading');
        });
};
exports.getDnecklaces = (req, res) => {
    const body = `Diamond necklaces are a captivating and exquisite embellishment that can elevate any ensemble with their timeless allure and radiance. The brilliance of diamonds creates a spellbinding display of light that catches the eye and draws attention to the neckline, making a diamond necklace a perfect accessory for any occasion. Whether it's a delicate pendant or a striking statement piece, diamond necklaces can be customized to reflect any style or budget. The durability of diamonds ensures that a diamond necklace is an investment that will endure beyond a lifetime. Diamonds signify love and commitment, making a diamond necklace a popular choice for special events such as weddings, anniversaries, or birthdays. A diamond necklace can be worn alone as a stunning centerpiece or layered with other necklaces to create a unique and fashionable look.`;
    Product.find({ material: 'diamond', category: 'necklace' })
        .then((result) => {
            res.render('pages/products', {
                user: req.session.user == undefined ?undefined : req.session.user,
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log('error loading');
        });
};
exports.getDearrings = (req, res) => {
    const body = `Diamond earrings are a versatile accessory that can be dressed up or down to suit any occasion. The durability and timeless beauty of diamonds ensure that they will be cherished for years to come, making them a valuable investment for any jewelry collection. Whether you're looking to add a touch of glamour to your everyday look, or searching for the perfect gift for someone special, diamond earrings are a classic and enduring choice that will never go out of style.`;
    Product.find({ material: 'diamond', category: 'earring' })
        .then((result) => {
            res.render('pages/products', {
                user: req.session.user == undefined ?undefined : req.session.user,
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log('error loading');
        });
};
exports.getDbracelets = (req, res) => {
    const body = `With a range of styles and designs available, diamond bracelets can be customized to suit any personal taste or occasion. Whether it's a delicate tennis bracelet or an intricate bangle, the brilliance and sparkle of diamonds create a striking display of light that draws attention to the wrist. The durability of diamonds ensures that a diamond bracelet is an investment that will last a lifetime and beyond. With their timeless beauty and versatility, diamond bracelets are a must-have for any jewelry collection and are sure to become a treasured heirloom that can be passed down through generations.`;
    Product.find({ material: 'diamond', category: 'bracelet' })
        .then((result) => {
            res.render('pages/products', {
                user: req.session.user == undefined ?undefined : req.session.user,
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log('error loading');
        });
};

//Gold
exports.getGrings = (req, res) => {
    const body = `Gold rings have been a symbol of love and commitment for centuries. The warm, rich hue of gold is a timeless choice for any occasion, from weddings and engagements to everyday wear. Gold is a durable and precious metal that retains its value over time, making it a wise investment for any jewelry collection. With a range of styles and designs available, gold rings can be customized to suit any personal taste or budget. Whether it's a classic plain band or an intricately designed ring with diamonds or gemstones, gold rings are a versatile accessory that can be dressed up or down to suit any occasion. `;
    Product.find({ material: 'gold', category: 'ring' })
        .then((result) => {
            res.render('pages/products', {
                user: req.session.user == undefined ?undefined : req.session.user,
                products: result,

                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
exports.getGnecklaces = (req, res) => {
    const body = `Gold is a durable and valuable metal that retains its worth over time, making it a wise investment for any jewelry lover. With a variety of styles and designs available, gold necklaces can be personalized to match any taste or budget. Whether it's a minimalist chain or an intricate pendant with diamonds or other gemstones, gold necklaces are a versatile accessory that can be dressed up or down to suit any occasion. `;
    Product.find({ material: 'gold', category: 'necklace' })
        .then((result) => {
            res.render('pages/products', {
                user: req.session.user == undefined ?undefined : req.session.user,
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
exports.getGearrings = (req, res) => {
    const body = `Whether it's a modest pair of studs or an extravagant set of dangle earrings embellished with diamonds or other precious stones, gold earrings are a versatile accessory that can be dressed up or down to match any event.Gold earrings are a luxurious and exquisite accessory that can add an element of refinement and sophistication to any wardrobe. The gleaming and radiant sheen of gold creates a timeless and classic appearance that is appropriate for any occasion`;
    Product.find({ material: 'gold', category: 'earring' })
        .then((result) => {
            res.render('pages/products', {
                user: req.session.user == undefined ?undefined : req.session.user,
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
exports.getGbracelets = (req, res) => {
    const body = 'Gold bracelets come in many styles and designs, making them a versatile accessory that can be worn with any outfit. Some popular styles include chain bracelets, bangles, cuffs, and tennis bracelets. Gold bracelets can be worn alone as a statement piece or stacked with other bracelets to create a trendy and personalized look. They can be dressed up or down to suit any occasion, from a casual daytime outfit to an evening gown.';
    Product.find({ material: 'gold', category: 'bracelet' })
        .then((result) => {
            res.render('pages/products', {
                user: req.session.user == undefined ?undefined : req.session.user,
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.addToWishlist = asyncHandler(async (userID, prodID) => {
    try {
        const users = await user.find({email : userID});
        const alreadyadded = users.wishlist.find(
            (id) => id.toString() === prodID
        );
        if (alreadyadded) {
            let users = await user.findByIdAndUpdate(
                userID,
                {
                    $pull: { wishlist: prodID },
                },
                {
                    new: true,
                }
            );
            

        } else {
            let users = await user.findByIdAndUpdate(
                userID,
                {
                    $push: { wishlist: prodID },
                },
                {
                    new: true,
                }
            );
            res.json(users);
        }
    } catch (err) {
        console.log(err);
    }
});

exports.getWishlist = asyncHandler(async (req, res) => {
    const { userID } = req.session.user;
  
    try {
      const User = await user.find({email : userID});
  
      if (!User) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const wishlistItems = await product.find({ _id: { $in: User.wishlist } });
  
      res.render('pages/wishlist', {  user: req.session.user == undefined ?undefined : req.session.user, products: wishlistItems });
    } catch (error) {
      throw new Error(error);
    }
  });
