import { User } from 'firebase/auth';
import { LiaHeartSolid, LiaHeart } from 'react-icons/lia';

const HasLikes = (likeArr: string[], user?: User | null) => {
  if (!user) return;

  if (likeArr.includes(user.uid)) {
    return <LiaHeartSolid size={20} className='text-[#BF1E2E]' />;
  } else {
    return <LiaHeart size={20} />;
  }
};

export default HasLikes;
