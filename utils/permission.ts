const PERMISSION = {
   // contact us
   CONTACT_US: {
      PATCH: '101',
   },

   // category
   CATEGORY: {
      POST: '102',
      PATCH: '103',
      DELETE: '104',
   },

   // product
   PRODUCT: {
      POST: '105',
      PATCH: '106',
      DELETE: '107',
   },

   // shipping cost
   SHIPPING_COST: {
      PATCH: '108',
   },

   // discount code
   DISCOUNT_CODE: {
      LIST: '109',
      POST: '110',
      PATCH: '111',
      DELETE: '112',
   },

   // Change cart status
   CHANGE_CART_STATUS: {
      PATCH: '113',
   },

   // Replying on the comment
   REPLY_ON_COMMENT: {
      PATCH: '114',
   },

   // Delete a comment
   DELETE_COMMENT: {
      DELETE: '115',
   },

   // View the reports
   VIEW_REPORTS: {
      LIST: '116',
   },

   // Edit users
   EDIT_USERS_INFO: {
      PATCH: '117',
   },

   // Block users
   BLOCK_USERS: {
      PATCH: '118',
   },
};

export default PERMISSION;
