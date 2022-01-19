import { useState } from "react";
import { NavLink } from "react-router-dom";

const Post = ({ post, isOwner, CurrentId, isAdmin, onComment, onDeletePost, onDeleteComment, onShowUser }) => { //On récupère de notre page
  const [content, setContent] = useState(""); //On set le hook content
  
  return (
    <main className="flex-col justify-center bg-gray-400 min-h-screen h-full pt-6 pb-6">
      <div className=" h-fit bg-white mb-6 ml-6 mr-6 mt-12">
        <h1 className="pt-6 mb-6 text-grey-darkest mb-6 underline-offset-auto font-black">
          {post.title}
        </h1>
        <NavLink to={`/profile/${post.user?.id}` /*Lien vers profile*/}></NavLink> 
        <p
          onClick={() => onShowUser()} //Fonction qui envoie sur le profile du créateur du post.
          className="text-purple-600 hover:text-purple-700  font-semibold text-center pb-6 cursor-pointer"
        >
          {post.user?.userName}
        </p>
        {post.image ? <div className="flex justify-center h-80"> 
           <img src={post.image} alt={post.title}/> 
        </div> : ''}  {/*Si il y a une image, elle es sur le post, sinon on laisse vide.*/}
        <p className="text-gray-600  text-center mb-4 mt-4 text-center">
          {post.textContent}
        </p>
        <div className="flex-col">
          <p className="ml-6 text-black">
            {post.comments?.length} commentaires
          </p>
          {isOwner || isAdmin ? ( //Si l'utilisateur est le owner du post, ou un admin il voit les boutons.
            <>
              <div className="flex">
                <NavLink className="w-full" to={`/edit/${post.id}`}/*On renvoie vers l'édition de post.*/> 
                  <button className="font-bold  py-2 px-4 w-full bg-purple-400  text-white shadow-md">
                    Edit Post
                  </button>
                </NavLink>
                <div className="w-full">
                  <button
                    className="font-bold  py-2 px-4 w-full bg-red-400  text-white shadow-md"
                    onClick={onDeletePost} //On utilise deletePost de la page.
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            </>
          ) : ''}
        </div>
      </div>
      <div className="mb-6 ml-6 mr-6  ">
        <div>
          <input type="hidden" />
          <textarea
            className="w-full shadow-inner p-4 border-0 mb-4  focus:shadow-outline "
            placeholder="Ask questions here."
            cols="6"
            rows="6"
            id="comment_content"
            onChange={(e) => {
              setContent(e.target.value); //On récupère le contenu du commentaire input.
            }}
          />
          <button
            onClick={() => onComment(content)} //Et on le post avec onComment qui vient de la page.
            className="font-bold py-2 px-4 w-full bg-purple-400  text-white shadow-md"
          >
            Comment
          </button>
        </div>
        {post.comments?.map((comment) => ( //On map les commentaires du post
          <div id="task-comments" className="pt-4 mb-4" key={comment?.id}>
            <div className="bg-white  p-3  flex flex-col justify-center items-center md:items-start shadow-lg mb-4">
              <div className="flex flex-row justify-center mr-2">
                <img
                  alt="avatar"
                  width="48"
                  height="48"
                  className=" w-10 h-10 mr-4 shadow-lg mb-4"
                  src={comment.user?.image}
                />
                <h3 className="text-purple-600 font-semibold text-center md:text-left ">
                  {comment.user?.userName}
                </h3>
              </div>
              <p className="text-gray-600  text-center md:text-left">
                {comment.content}
              </p>
              <div className="btn">
                {CurrentId === comment.userId && ( //Si l'user est propriètaire du commentaire; il voit le bouton.
                  <>
                    <div className="div">
                      <button
                        className="font-bold mt-4 py-2 px-4 bg-red-400  text-white shadow-md"
                        onClick={(e) => {
                          e.preventDefault()
                            let id = comment.id
                            onDeleteComment(id) //On utilise delete comment de notre page
                            window.location.reload()
                        }}
                      >
                        Delete Comment
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Post;
