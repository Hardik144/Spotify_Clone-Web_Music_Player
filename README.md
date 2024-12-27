# 🎵 Spotify Clone - Web Music Player
A simple, responsive web-based music player inspired by Spotify. Built using **HTML**, **CSS**, and **JavaScript**, this project allows users to organize and play their favorite songs by genre or taste (e.g., Pop, Rock, Romantic, etc.) directly from a local `songs` folder.  

<br>

## 🌟 Features  
- **Responsive Design**: Optimized for various screen sizes (desktop, tablet, and mobile).  
- **No Backend**: Songs are managed through structured folders and metadata in `info.json` files.  
- **Customizable**: Organize music by creating folders based on your favorite genres or themes.  
- **Dynamic Song List**: Automatically fetches and displays songs with their titles and descriptions.  
- **Interactive UI**: User-friendly interface with play, pause, next, previous, and seek functionalities.  

<br>

## 🚀 How to Use  

### Prerequisites  
- A modern web browser (Chrome, Firefox, Edge, etc.).  

### Setup  
1. **Clone the Repository**  
   ```bash  
   git clone https://github.com/Hardik144/spotify-clone.git  
   cd spotify-clone  
   ```  

2. **Organize Songs**  
   - Navigate to the `songs` folder.  
   - Create subfolders based on your music taste (e.g., `Pop`, `Rock`, `Romantic`).  
   - Inside each subfolder, add `.mp3` files.  

3. **Create Metadata**  
   - Inside each subfolder, create an `info.json` file to include song metadata.  
   - Example `info.json` structure:  
     ```json   
       {  
         "title": "Album Title 1",  
         "description": "A short description of the album."  
       } 
     ```  

4. **Open the Player**  
   - Launch the `index.html` file in your browser to start enjoying your music!  

<br>

## 📂 Project Structure  

``` 
spotify-clone/  
│  
├── CSS/  
│   ├── style.css        # Main stylesheet for the player  
│   └── responsive.css   # Stylesheet for responsive design  
├── Javascript/  
│   └── script.js        # JavaScript logic for the player  
├── songs/  
│   ├── Pop/  
│   │   ├── song1.mp3  
│   │   ├── song2.mp3  
│   │   └── info.json     # Metadata for the Pop genre  
│   ├── Best/  
│   │   ├── song1.mp3  
│   │   ├── song2.mp3  
│   │   └── info.json     # Metadata for the Rock genre  
│   └── Chill/  
│       ├── song1.mp3  
│       ├── song2.mp3  
│       └── info.json     # Metadata for the Romantic genre  
├── images/              # Folder containing all images for the player  
│   ├── logo.png  
│   ├── play-button.png  
│   └── pause-button.png  
├── favicon.ico          # Favicon for the website (Spotify logo)  
├── index.html           # Main entry point of the player  
└── README.md            # Project documentation  
  
```  

<br>

## 📸 Screenshots  
### Desktop View  
![Spotify-Desktop](https://github.com/user-attachments/assets/0f5df080-58b8-4bfa-ac51-0d2724bd9a1b)

<br>

### Mobile View  
![Spotify-Mobile](https://github.com/user-attachments/assets/7d7480d5-46d2-449a-8602-5b1cf3f2eddf)

<br>

## 💡 Customization  
Feel free to modify the design or add new features! Suggestions:  
- Add themes (dark/light mode).  
- Enhance the player with additional controls like shuffle and repeat.  
- Integrate album art for songs using extra metadata.  

<br>

## 🛠️ Technologies Used  
- **HTML**: Markup for the structure.  
- **CSS**: Styling for a sleek, responsive design.  
- **JavaScript**: Logic to handle player functionality.  

<br>

## 📜 License  
This project is open-source and available under the [MIT License](LICENSE).  

<br>

## 🌐 Live Demo  
[Click here](https://spotify-webplayer.freewebhostmost.com/) to experience the Spotify Clone!  

<br>

## 📧 Contact  
Have questions or want to share your feedback? Feel free to reach out:  
- **Email**: patidarhardik81@gmail.com  
- **GitHub**: [Hardik144](https://github.com/Hardik144)  

<br>

🎶 **Organize, Play, and Enjoy your music!** 🎶  
