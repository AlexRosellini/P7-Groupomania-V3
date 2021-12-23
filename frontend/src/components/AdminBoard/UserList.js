const UserList = ({users, onDeleteUser, onUpdateRole}) => {
    return ( 
        <main className="h-full px-3 py-4 flex justify-center bg-gray-900 ">
            <table className="w-full text-md bg-white shadow-md rounded mb-4">
                <tbody>
                    <p className="p-3"> {users?.length} utilisateurs enregistrés. </p>
                    <tr className="border-b">
                        <th className="text-left p-3 px-5">Nom de compte:</th>
                        <th className="text-left p-3 px-5">Email:</th>
                        <th className="text-left p-3 px-5">Role</th>
                        <th className="text-left p-3 px-5">Supprimer Compte</th>
                    </tr>
                    {users?.map(user => (
                        <>
                        <tr className="border-b hover:bg-orange-100 bg-gray-100">
                        <td className="p-3 px-5"><p className="bg-transparent"> {user.userName} </p></td>
                        <td className="p-3 px-5"><p className="bg-transparent"> {user.email} </p></td>
                        {user.isAdmin ?                         
                        <td className="p-3 px-5"><p className="bg-transparent">Administrateur</p></td>:
                        <td className="p-3 px-5"><button className="font-bold  py-2 px-4 bg-purple-400  text-white shadow-md"
                        onClick={(e) => {
                            e.preventDefault();
                            const userId = user.id
                            console.log(userId);
                            onUpdateRole(userId);
                        }}
                        >Rendre Admin</button></td>}
                        <td className="p-3 px-5"><button className="font-bold  py-2 px-4 bg-red-400  text-white shadow-md"
                        onClick={(e) => {
                            e.preventDefault();
                            const userId = user.id
                            console.log(userId)
                            onDeleteUser(userId)
                        }}
                        >Supprimer le Compte</button></td>
                    </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </main>
     );
}
 
export default UserList;