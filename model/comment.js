const Moment = require("moment");
const connection = require('./database');
const AbstractModel = require('./abstract');

class CommentModel extends AbstractModel {
    constructor(params = {}) {
        super();
        this.id = params.id;
        this.comment = params.comment;
        this.post_id = params.post_id;
        this.created_user_id = params.created_user_id;
        this.updated_user_id = params.updated_user_id;
        this.deleted_user_id = params.deleted_user_id;
        this.created_at = params.created_at;
        this.updated_at = params.updated_at;
        this.deleted_at = params.deleted_at;
    }

    static create(currentUser, params) {
        const id =super.generateId();
        const commentCreateParams = {
            id : id,
            comment: params.comment,
            post_id: params.post_id,
            created_user_id : currentUser.created_user_id,
            updated_user_id : currentUser.created_user_id,
            deleted_user_id: null,
            created_at: Moment().format(),
            updated_at: Moment().format(),
            deleted_at: null
          };
        connection.query('INSERT INTO comments SET ?', commentCreateParams);
        return commentCreateParams;
    }

    static update(currentUser, params, commentId) {
        const commentUpdateParams = {
            comment: params.comment,
            post_id: params.post_id,
            created_user_id : currentUser.created_user_id,
            updated_user_id : currentUser.created_user_id,
            deleted_user_id: null,
            created_at: Moment().format(),
            updated_at: Moment().format(),
            deleted_at: null
          };

        const query = `update comments SET ? where id ='${commentId}' `;

        connection.query(query, commentUpdateParams);
        return commentUpdateParams;
    }

    static async getAllComment(searchData) {
        var result = {};
        var postedCreater = null;

        if(searchData) {
            if(!searchData.createdUser && searchData.postId) {
                result = await connection.query(`SELECT * FROM comments WHERE post_id ='${ searchData.postId }' ORDER BY created_at desc`);
            } else if (!searchData.postId && searchData.createdUser) {
                postedCreater = await UserModel.getByName(searchData.createdUser);
                for(var index in postedCreater) {
                    result = await connection.query(`SELECT * FROM comments WHERE created_user_id ='${postedCreater[index].id}' ORDER BY created_at desc`)
                }
            } else if(searchData.postId && searchData.createdUser) {
                postedCreater = await UserModel.getByName(searchData.createdUser);
                for(var index in postedCreater) {
                    result = await connection.query(`SELECT * FROM comments WHERE created_user_id ='${postedCreater[index].id}' AND post_id ='${ searchData.postId }' ORDER BY created_at desc`)
                }
            } else {
                result = await connection.query(`SELECT * FROM comments ORDER BY created_at desc`);
            }
        }

        return result;
    }

    static async getById(id) {
        const result = await connection.query(`SELECT * FROM comments WHERE id = '${id}'`);

        return result[0];
    }

    static async getByPostId(postId) {
        const result = await connection.query(`SELECT * FROM comments WHERE post_id = '${postId}' ORDER BY created_at desc`);

        return result;
    }

    static async getByUserId(userId) {
        var result = await connection.query(`SELECT * FROM comments WHERE created_user_id = '${userId}' ORDER BY created_at desc`);

        return result;
    }

    static async delete(currentUser, id){
        const result = await connection.query(`DELETE from comments WHERE id = '${id}' AND created_user_id = '${currentUser.created_user_id}'`);

        return result;
    }

    static toModel(item) {
        if (!item) return null;
        const params = {
          id: item.id !== undefined ? item.id : null,
          comment: item.comment !== undefined ? item.comment : null,
          post_id: item.post_id !== undefined ? item.post_id : null,
          created_user_id: item.created_user_id !== undefined ? item.created_user_id : null,
          updated_user_id: item.updated_user_id !== undefined ? item.updated_user_id : null,
          deleted_user_id: item.deleted_user_id !== undefined ? item.deleted_user_id : null,
          created_at: item.created_at !== undefined ? item.created_at : null,
          updated_at: item.updated_at !== undefined ? item.updated_at : null,
          deleted_at: item.deleted_at !== undefined ? item.deleted_at : null
        };

        return new CommentModel(params);
    }
}

module.exports = CommentModel;
