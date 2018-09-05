var Post = require('../model/posts');

var users = function(io){

  io.on('connection', function(socket){
    console.log('user connected');
    Post.find({},function(err,data){
      if(err){
        io.emit('error',{error:'database find error'});
      }else{
        io.emit('posts',data);
      }
    });

    socket.on('submit post', function(userPost){
      console.log('USERPOST', userPost)
      let post = new Post();
      post.post = userPost.post;
      post.user_name = userPost.name;
      post.user_email = userPost.email;
      post.save(function(err,data){
        if(err) {
          io.emit('error',{error:'submit post error'});
        }else{
          Post.find({},function(err,data){
            if(err){
              io.emit('error',{error:'database find error'});
            }else{
              io.emit('posts',data);
            }
          })

        }
      })
      // io.emit('new post', msg);
    });
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

}

module.exports = users;
