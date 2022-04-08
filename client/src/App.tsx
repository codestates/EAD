import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import Login from './Routes/Login/index';
import Signup from './Routes/Signup/index';

const Home = loadable(() => import('Routes/Home/index'));
const Profile = loadable(() => import('Routes/Profile'));
const Mypost = loadable(() => import('Routes/Mypost'));
const Mycomment = loadable(() => import('Routes/Mycomment'));
const Search = loadable(() => import('Routes/Search/index'));
const Post = loadable(() => import('Routes/Post'));
const PostView = loadable(() => import('Routes/PostView'));
const PostModify = loadable(() => import('Routes/PostModify'));
const ComModify = loadable(() => import('Routes/ComModify'));
const Chat = loadable(() => import('Routes/Chat/index'));
const Naver = loadable(() => import('Routes/Auth/Naver'));
const Kakao = loadable(() => import('Routes/Auth/Kakao'));
const Google = loadable(() => import('Routes/Auth/Google'));
const NotFound = loadable(() => import('Components/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/mypost" element={<Mypost />} />
      <Route path="/mycomment" element={<Mycomment />} />
      <Route path="/post" element={<Post />} />
      <Route path="/post/:id" element={<PostView />} />
      <Route path="/post/modify/:id" element={<PostModify />} />
      <Route path="/comment/:id" element={<ComModify />} />
      <Route path="/search/*" element={<Search />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:roomId/:username" element={<Chat />} />
      <Route path="/auth/naver" element={<Naver />} />
      <Route path="/auth/kakao" element={<Kakao />} />
      <Route path="/auth/google" element={<Google />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
