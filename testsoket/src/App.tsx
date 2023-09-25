import { useEffect, useState } from 'react'
import { useAddUserMutation, useGetAllUserQuery } from './api/user';
import io from 'socket.io-client';
const socket = io('http://localhost:4000');
function App() {
  const [name, setname] = useState<any>()
  const [id, setid] = useState<any>(0)
  const { data: user, refetch } = useGetAllUserQuery('')
  const [adduser] = useAddUserMutation()
  useEffect(() => {
    // Lắng nghe sự kiện 'user_added' từ máy chủ WebSocket
    socket.on('user_added', (data) => {
      alert(data.message); // Hiển thị thông báo khi có người dùng mới được thêm

      // Sau khi thông báo, cập nhật dữ liệu người dùng bằng cách gọi refetch
      refetch();
    });

    // Đảm bảo ngắt kết nối khi component unmounts
    return () => {
      socket.disconnect();
    };
  }, [refetch]);
  const addUser = (e: any) => {
    e.preventDefault();
    const data = {
      name: name,
      id: id
    }
    adduser(data)
      .unwrap()
      .then(() => {
      })
  }
  return (
    <>
      <form onSubmit={addUser}>
        <input type="text" name="name" onChange={(e) => setname(e.target.value)} />
        <input type="number" name="id" onChange={(e) => setid(e.target.value)} />
        <button type="submit">Add User</button>
      </form>


      {user?.data?.map((data: any) => {
        return (<>
          <h1>{data?.id}</h1>
          <h1>{data?.name}</h1>
        </>)
      })}
    </>
  )
}

export default App
