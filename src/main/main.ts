import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, '../../public/index.html'));

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle selecting source directory
ipcMain.handle('select-source-directory', async () => {
  if (!mainWindow) return;
  
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    title: 'Select Source Directory'
  });
  
  if (canceled) {
    return null;
  }
  
  return filePaths[0];
});

// Handle selecting target directory
ipcMain.handle('select-target-directory', async () => {
  if (!mainWindow) return;
  
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    title: 'Select Target Directory'
  });
  
  if (canceled) {
    return null;
  }
  
  return filePaths[0];
});

// Function to get file extension
function getFileExtension(filename: string): string {
  return path.extname(filename).slice(1).toLowerCase() || 'other';
}

// Handle organizing files
ipcMain.handle('organize-files', async (_, sourceDir: string, targetDir: string) => {
  try {
    // Read all files from source directory
    const files = fs.readdirSync(sourceDir);
    
    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    const results = {
      total: files.length,
      processed: 0,
      skipped: 0,
      categories: {} as Record<string, number>
    };
    
    // Process each file
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      
      // Skip directories
      if (fs.statSync(sourcePath).isDirectory()) {
        results.skipped++;
        continue;
      }
      
      // Get file extension and create category folder if needed
      const extension = getFileExtension(file);
      const categoryDir = path.join(targetDir, extension);
      
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }
      
      // Track categories
      results.categories[extension] = (results.categories[extension] || 0) + 1;
      
      // Copy file to category folder
      const targetPath = path.join(categoryDir, file);
      fs.copyFileSync(sourcePath, targetPath);
      
      results.processed++;
    }
    
    return results;
  } catch (error) {
    console.error('Error organizing files:', error);
    throw error;
  }
}); 