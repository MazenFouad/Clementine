const express = require('express');
const { Order } = require('../models/order');
const { User } = require('../models/user');
const { OrderItem } = require('../models/order-items');
const router = express.Router();
const { Product } = require('../models/product');
const nodemailer = require('nodemailer');

//adding a new order to the schema
router.post(`/`, async (req, res) => {
    const orderItemsIds = Promise.all(
        req.body.orderItems.map(async (orderItem) => {
            const product = await Product.findById(orderItem.product).select(
                'name'
            );
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product,
                name: product.name,
            });
            newOrderItem = await newOrderItem.save();
            return newOrderItem._id;
        })
        // req.body.orderItems.map(async (orderItem) => {
        //     let newOrderItem = new OrderItem({
        //         quantity: orderItem.quantity,
        //         product: orderItem.product,
        //     });
        //     newOrderItem = await newOrderItem.save();
        //     return newOrderItem._id;
        // })
    );

    const orderItemIdsresolved = await orderItemsIds;
    let add_order = {
        orderItems: orderItemIdsresolved,
        order_id: req.body.order_id,
        userID: req.body.userID,
        shippingAddress1: req.body.shippingAddress1,
        city: req.body.city,
        zip: req.body.zip,
        status: req.body.status,
        totalAmount: req.body.totalAmount,
        phone_num: req.body.phone_num,
        dateOrdered: req.body.dateOrdered,
    };

    const orders = new Order(add_order);
    //catching errors method #2
    orders
        .save()
        .then((result) => {
            res.redirect('/ordersdash');
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get(`/`, async (req, res) => {
    if (req.session.admin != undefined) {
        Order.find()
            .then(async (orderslist) => {
                res.render('pages/ordersdash', {
                    order: orderslist,
                    isadmin: req.session.admin,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.render('pages/404');
    }
});

router.get('/:id', (req, res) => {
    if (req.session.admin != undefined) {
        Order.findById(req.params.id)
            // .populate('userID', '_id')
            .then((result) => {
                res.render('pages/updateorder', {
                    viewTitle: 'Update Order',
                    order: result,
                    isadmin: req.session.admin,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.redirect('/404');
    }
});
// router.delete('/:id', async (req, res) => {
//     try {
//       const orderID = req.params.id;
//       await Order.findOneAndDelete({ _id: orderID });
//       console.log(orderID);
//       console.log(`Order with ID ${orderID} deleted.`);

//       if (req.query.ajax) {
//         res.json({ message: "Order deleted successfully" });
//       } else {
//         res.redirect('/ordersdash');
//       }
//     } catch (error) {
//       console.error('Error deleting order: ', error);
//       res.status(500)
//         .json({ error: 'Failed to delete order, please try again.' });
//     }
//   });

router.post('/:id', async (req, res) => {
    try {
        const orderID = req.params.id;
        const deletedOrder = await Order.findByIdAndDelete(orderID);
        if (!deletedOrder) {
            throw new Error(`Order with ID ${orderID} not found`);
        }
        console.log(`Order with ID ${orderID} deleted.`);
        res.redirect('/ordersdash');
    } catch (error) {
        console.log('Error deleting order: ', error);
        res.redirect('/ordersdash');
    }
});

router.post('/update/:id', async (req, res) => {
    const orderID = req.params.id;
    const updates = req.body.inputs;
    const orderr = await Order.findById(orderID).populate('orderItems');
    const orderitems = orderr.name;
    const order = await Order.findById(orderID).populate('userID');
    if (!order) {
        return res.status(404).send('Order not found');
    }
    let Error = {
        statusError: String,
        shippingAdd: String,
        cityError: String,
    };
    let newStatus = updates.status;
    let oldStatus = order.status;
    let c = 0;
    if (
        newStatus !== 'Delivered' &&
        newStatus !== 'Shipped' &&
        newStatus !== 'Cancelled' &&
        newStatus !== 'Pending'
    ) {
        Error.statusError = `Invalid Status, please write one of the following : Delivered/Shipped/Cancelled/Pending`;
        c++;
    } else if (newStatus.length == 0) {
        updates.status = oldStatus;
    }
    if (
        updates.shippingAddress1.length < 6 &&
        updates.shippingAddress1.length != 0
    ) {
        Error.shippingAdd = 'Enter a valid address with more details';
        c++;
    } else if (updates.shippingAddress1.length == 0) {
        updates.shippingAddress1 = order.shippingAddress1;
    }
    if (updates.city < 3 && updates.city != 0) {
        Error.cityError = 'Enter a valid city name';
        c++;
    } else if (updates.city.length == 0) {
        updates.city = order.city;
    }
    if (c == 0) {
        await Order.findByIdAndUpdate(orderID, updates);

        if (newStatus === 'Cancelled' && oldStatus !== 'Cancelled') {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'clementineco2023@gmail.com',
                    pass: 'lmkwmjbyftpuzwhz',
                },
            });

            const user = order.userID;
            const mailOptions = {
                from: 'clementineco2023@gmail.com',
                to: user.email,
                subject: 'Order Cancelled',
                text: `Dear ${order.userFullName},\n\nYour order with Order ID ${orderID} has been cancelled.\n\nThank you.`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`Email sent: ${info.response}`);
                }
            });
        } else if (newStatus === 'Shipped' && oldStatus !== 'Shipped') {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'clementineco2023@gmail.com',
                    pass: 'lmkwmjbyftpuzwhz',
                },
            });

            const user = order.userID;
            const mailOptions = {
                from: 'clementineco2023@gmail.com',
                to: user.email,
                subject: 'Order Shipped',
                text: `Dear ${order.userFullName},\n\nYour order with Order ID ${orderID} has been shipped!\n\nThank you.`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`Email sent: ${info.response}`);
                }
            });
        } else if (newStatus === 'Delivered' && oldStatus !== 'Delivered') {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'clementineco2023@gmail.com',
                    pass: 'lmkwmjbyftpuzwhz',
                },
            });

            const user = order.userID;
            const mailOptions = {
                from: 'clementineco2023@gmail.com',
                to: user.email,
                subject: 'Order Delivered',
                text: `Dear ${order.userFullName},\n\n Your order should have been delivered to you. Please let us know your feedback and if you have any inquiries.\n\nWith love, \n\nClementine.`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`Email sent: ${info.response}`);
                }
            });
        }
        res.send('done');
    } else {
        console.log(Error);
        let err = {
            statusError: Error.statusError,
            shippingAdd: Error.shippingAdd,
            cityError: Error.cityError,
        };
        res.send(err);
    }
});

/* router.get(`/`, async (req, res) => {
//.populate -> if i want to know the user who ordered
  //displays the first and last name for the user + sort by date from newest to oldest
  const ordersList = await Order.find()
      .populate('userID', 'firstname + lastname')
      .sort({ dateOrdered: -1 })
  .then(async (ordersList) => {          
  res.render('pages/editcustdash', {
    order: ordersList
  })

  })
  .catch((err) => {
      
    console.log(err);
  });
 
});




//to display a specific object (order id, etc) from db:

router.get('/:id', async (req, res) => {
  //populate to see order details
  const orders = await Order.findById(req.params.id).populate({
      path: 'orderItems',

      //populate will be an object to get all info about product items
      populate: {
          path: 'product',
          populate: 'category',
      },
  });

  if (!orders) {
      return res.status(500).json({
          message: 'The order with the given ID was not found.',
      });
  }

  res.status(200).send(orders);
});



/* router.post(`/`, function (req, res) {
  const order = new Order({
      order_id: req.body.order_id,
      userID: req.body.userID,
      userName: req.body.userName,
      orderitems: req.body.orderitems,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      status: req.body.status,
      totalAmount: req.body.totalAmount,
      phone_num: req.body.phone_num,
      dateOrdered: req.body.dateOrdered,
  });
  //catching errors method #2
  order
      .save()
      .then((createdOrder) => {
          res.status(201).json(createdOrder);
      })
      .catch((err) => {
          res.status(500).json({
              error: err,
              success: false,
          });
      });
});
*/
/* router.delete('/:id', function (req, res) {
    Order.findByIdAndRemove(req.params.id)
        .then(async (order) => {
            if (order) {
                //will use map to get every order item and find it and delete it
                await order.orderItems.map(async (orderItem) => {
                    await OrderItem.findByIdAndRemove(orderItem);
                });
                return res.status(200).json({
                    success: true,
                    message: 'the order has been deleted',
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'the order was not found',
                });
            }
        })
        .catch((err) => {
            return res.status(500).json({ success: false, error: err });
        });
});
*/
//exporting method #2

module.exports = router;
