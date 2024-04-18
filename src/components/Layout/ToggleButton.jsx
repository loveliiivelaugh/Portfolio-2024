// Packages
import { FormControlLabel, Switch } from '@mui/material';

// Services
import { useChatStore } from '../Chat/store';


export default function ColorToggleButton() {
  const chat = useChatStore();

  return (
    <FormControlLabel
      control={<Switch checked={chat.visionMode === 'documents'} />}
      onChange={() => chat.toggleVisionMode((chat.visionMode === 'default') ? 'documents' : 'default')}
    />
  )
}