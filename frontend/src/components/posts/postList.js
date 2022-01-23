/*************************************************/
//On Importe ce dont on a besoin.

import { NavLink } from "react-router-dom";

/*************************************************/
//Notre component

const PostList = ({posts}) => { //On récupère de la page.
	if(!posts || posts.length === 0) { //Si aucun post existe, on utilise le html/css si-dessous.
		return ( 
			<>
			<main className="h-screen flex flex-col pt-40 items-center bg-gray-400">
				<NavLink className='w-1/2' to={`/create`}> 
            	    <div className="border bg-white mt-6 mb-6 rounded-2xl p-4" >
						<p>
							aucun post pour le moment, vous pouvez en créer un en cliquant ici!
						</p>
					</div>
				</NavLink>
			</main>
			</>
		)
	}

    return ( 
        <>
            <main className="h-full  flex flex-col justify-center items-center bg-gray-400">
            {posts?.map(post => ( //On map les posts.
                <NavLink className='lg:w-1/2 md:1/2 sm:2/2 sm:m-4' key={post.id} to={`/posts/${post.id}`}>
                <div className="border  bg-white mt-6 mb-6 rounded-2xl p-4" >
                <div className="flex items-center justify-between">
                    <div className="gap-3.5	flex items-center">
                        <img src={post.user.image} alt="testImg"
                         className="object-cover bg-yellow-500 rounded-full h-10"/>
                        <div className="flex flex-col">
					        <p className="mb-2 capitalize"> {post.user.userName} </p>
				        </div>
                    </div> 
                </div>
                <div className="whitespace-pre-wrap mt-7"> {post.title} </div>
		        <div className="mt-5 flex gap-2	 justify-center border-b pb-4 flex-wrap	">
                   { post.image ? <img src={post.image} class="rounded-2xl w-80 object-cover h-96 flex-auto" alt="" /> : ''}
                </div>
                <div className=" h-16 border-b  flex items-center justify-start">
                    <div className="text-sm pl-4"> {post.comments.length} comments </div>
                </div>   
            </div>
            </NavLink>
            ))}
        </main>
        </>    
     );
}
 
export default PostList;