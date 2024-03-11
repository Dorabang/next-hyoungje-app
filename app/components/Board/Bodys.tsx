import PostsLoading from '../Posts/PostsLoading';
import PostsNotFound from '../Posts/PostsNotFound';
import { doc, updateDoc } from 'firebase/firestore';
import { dbService } from '@/firebase';
import { useContext } from 'react';
import { PostContext } from '.';
import { deletePost } from '@/apis/posts';
import PostList from './PostList';
