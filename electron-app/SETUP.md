# SoulSync Electron App - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
cd /app/electron-app
yarn install
```

### 2. Configure Environment (Optional)

The app works in **dual-mode**:
- **Fake Mode**: No configuration needed - uses mock data for development
- **Real Mode**: Configure `.env` file for actual integration

#### For Fake Mode (Default)
Just run the app - no configuration needed!

#### For Real Mode
Edit `.env` file:

```env
# Supabase Authentication
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Backend API
NEXT_PUBLIC_BACKEND_API_URL=http://192.168.1.100:8000
```

### 3. Run the App

```bash
# Start both Next.js and Electron
yarn dev

# Or run separately in two terminals:
# Terminal 1:
yarn dev:next

# Terminal 2 (wait for Next.js to start):
yarn dev:electron
```

## Backend API Setup

Your backend should implement these endpoints:

### 1. POST /setup
Save user account setup data.

**Request:**
```json
{
  "name": "John Doe",
  "tgids": ["@telegram_user1", "@telegram_user2"],
  "userid": "supabase_user_id",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true
}
```

### 2. GET /mood/{user_id}
Get current user mood.

**Response:**
```json
{
  "mood": "anxiety",
  "message": "Optional context message"
}
```

Supported moods: `anxiety`, `depression`, `sad`, `happy`, `calm`, `neutral`

### 3. POST /chat
Send chat message and get AI response.

**Request:**
```json
{
  "user_id": "user_id_here",
  "message": "I'm feeling anxious today"
}
```

**Response:**
```json
{
  "response": "I understand you're feeling anxious. Let's talk about it..."
}
```

## Backend Example (Python FastAPI)

Here's how to add the required endpoints to your existing backend:

```python
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class SetupRequest(BaseModel):
    name: str
    tgids: List[str]
    userid: str
    email: str

class ChatRequest(BaseModel):
    user_id: str
    message: str

class MoodResponse(BaseModel):
    mood: str
    message: str = ""

# User setup endpoint
@app.post("/setup")
def setup_user(data: SetupRequest):
    # Save user data to your database
    # TODO: Implement your storage logic
    print(f"Setting up user: {data.name}, {data.email}")
    print(f"Telegram IDs: {data.tgids}")
    return {"success": True}

# Mood detection endpoint
@app.get("/mood/{user_id}")
def get_mood(user_id: str) -> MoodResponse:
    # TODO: Implement your mood detection logic
    # For now, return a default mood
    return MoodResponse(
        mood="neutral",
        message="Mood detected successfully"
    )

# Chat endpoint (you already have this)
@app.post("/chat")
def chat_endpoint(data: ChatRequest):
    from LLM_integration_structured import soul_sync_chat
    result = soul_sync_chat(data.user_id, data.message)
    return result
```

## Supabase Setup (for Real Auth)

### 1. Create Supabase Project
1. Go to https://supabase.com
2. Create a new project
3. Note your project URL and anon key

### 2. Enable Google OAuth
1. In Supabase Dashboard → Authentication → Providers
2. Enable "Google" provider
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
4. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - Your production URL

### 3. Configure Electron App
Add to `.env`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Testing the App

### Fake Mode Testing (No Configuration)

1. **Start the app:**
   ```bash
   yarn dev
   ```

2. **Test Login:**
   - Click "Continue with Google"
   - Should auto-login with fake user in ~1 second
   - Check console for "⚠️ Supabase: Fake authentication mode"

3. **Test Account Setup:**
   - Enter name: "Test User"
   - Add telegram IDs: "@testuser1", "@testuser2"
   - Click "Complete Setup"
   - Should save (fake) in ~1 second

4. **Test Mood-Based UI:**
   - Landing page should show random mood
   - Each mood has different colors and emoji
   - Check console for "😊 [FAKE] Mood check"

5. **Test Chat:**
   - Click "💬 Start Chatting"
   - Send a message
   - Should get fake response about configuring backend

6. **Test System Tray:**
   - Close window (X button)
   - App should minimize to system tray
   - Click tray icon to restore
   - Right-click tray → Quit to actually exit

### Real Mode Testing (With Configuration)

1. **Configure `.env`** with real credentials

2. **Start backend:**
   ```bash
   cd /path/to/backend
   python api_server.py
   ```

3. **Start Electron app:**
   ```bash
   cd /app/electron-app
   yarn dev
   ```

4. **Test Real Authentication:**
   - Click "Continue with Google"
   - Should open Google OAuth popup
   - Complete sign-in
   - Check console for "✅ Supabase: Real authentication mode"

5. **Test Real API:**
   - Complete account setup
   - Check backend logs for POST /setup
   - Test mood detection (check backend logs)
   - Test chat functionality

## Troubleshooting

### Electron window shows blank screen
- Check if Next.js is running on http://localhost:3000
- Open DevTools (Ctrl+Shift+I in Electron window)
- Look for errors in console

### "Module not found" errors
```bash
rm -rf node_modules yarn.lock
yarn install
```

### Port 3000 already in use
```bash
# Kill process on port 3000
# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Supabase auth not working
- Check `.env` file has correct values
- Verify Google OAuth is configured in Supabase
- Check redirect URLs match

### Backend API connection failed
- Verify backend is running
- Test backend manually: `curl http://192.168.1.100:8000/`
- Check CORS configuration in backend
- Verify IP address in `.env`

### System tray icon not visible
- Check system tray settings (might be hidden)
- On Linux, ensure tray extension is installed
- Icon might be in overflow area

## Development Tips

### Hot Reload
- Next.js components hot reload automatically
- Electron main process requires restart
- To restart Electron: Close window → Run `yarn dev:electron`

### Debugging
- **Frontend**: Use browser DevTools in Electron window
- **Backend**: Check backend terminal logs
- **Electron Main**: Check terminal where you ran `yarn dev`

### Console Messages
Watch for these indicators:
- `✅ Supabase: Real authentication mode` - Real auth enabled
- `⚠️ Supabase: Fake authentication mode` - Using fake auth
- `✅ Backend API: Real mode` - Connected to real backend
- `⚠️ Backend API: Fake mode` - Using mock data

## Building for Production

```bash
# Build Next.js
yarn build

# Package Electron app
yarn electron:build
```

Output in `dist/` folder.

## Next Steps

1. ✅ Set up and test in fake mode
2. ✅ Configure Supabase for real auth
3. ✅ Update backend with required endpoints
4. ✅ Test with real integrations
5. ✅ Build and distribute

## Support

For issues, check:
1. Console logs in Electron DevTools
2. Terminal output where you ran `yarn dev`
3. Backend terminal logs
4. README.md for detailed documentation
