// Packages
import { FormControlLabel, Switch } from '@mui/material';
import { useChatStore } from '../Chat/store';
// import { useDispatch, useSelector } from 'react-redux';

// Services
// import { chatSlice } from '../store/features/chat';


export default function ColorToggleButton() {
  const chat = useChatStore();
  // Hooks
  // const dispatch = useDispatch();
  // const chat = useSelector((state) => state.chat);
  
  // Render
  return (
    <FormControlLabel
      control={<Switch checked={chat.visionMode === 'documents'} />}
      onChange={() => {}}
    />
  )
}