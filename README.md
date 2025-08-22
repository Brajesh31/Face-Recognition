<p align="center">
  <a href="https://github.com/Brajesh31/Face-Recognition">
    <img src="https://raw.githubusercontent.com/Brajesh31/asset/main/face-recognition-banner.png" alt="Face Recognition Banner">
  </a>
</p>

<div align="center">

# 👤 Real-Time Face Recognition System 📹

**A Python application for detecting and identifying faces in images and live video streams, with an automated attendance logging feature.**

</div>

<p align="center">
  <img src="https://img.shields.io/github/stars/Brajesh31/Face-Recognition?style=for-the-badge&color=gold" alt="Stars">
  &nbsp;
  <img src="https://img.shields.io/github/last-commit/Brajesh31/Face-Recognition?style=for-the-badge&color=blue" alt="Last Commit">
  &nbsp;
  <img src="https://img.shields.io/github/license/Brajesh31/Face-Recognition?style=for-the-badge&color=green" alt="License">
</p>

---

## ✨ Project Overview

This project is a real-time face recognition system built with Python and popular computer vision libraries. The application can identify and recognize known individuals from a live webcam feed. When a known face is detected, it draws a bounding box around it, labels it with the person's name, and logs their attendance in a CSV file with a timestamp.

This system provides a practical foundation for various real-world applications, such as automated attendance tracking, security systems, and personalized user experiences.

[GIF of the face recognition system in action]

<br>

## ⭐ Core Features

* **Real-Time Recognition:** Identifies faces from a live webcam feed at a high frame rate.
* **Image-Based Recognition:** Can also be adapted to recognize faces in static images.
* **Dynamic Database:** Easily add new individuals by simply adding their image to the `known_faces` directory.
* **Automated Attendance Logging:** Automatically records the name and time of the first appearance of a recognized person in `attendance.csv`.
* **High Accuracy:** Built on top of dlib's state-of-the-art face recognition model, which has a very high accuracy.

<br>

## ⚙️ How It Works

The recognition process follows a simple pipeline:
1.  **Load & Encode Known Faces:** The application scans the `known_faces` directory, learns the facial features of each person, and creates a unique "face encoding" for them.
2.  **Capture Video Frame:** It captures a single frame from the live webcam feed.
3.  **Find & Encode Faces:** It locates all faces in the current frame and computes their face encodings.
4.  **Compare Faces:** It compares the encodings of the detected faces with the encodings of the known faces.
5.  **Display & Log:** If a match is found, it draws a labeled box around the face on the screen and logs the person's name and the current time to `attendance.csv`.

<br>

## 🛠️ Technology Stack

| Technology                                                                                                                         | Description                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [![Python][Python-badge]][Python-url]                                                                                              | Core programming language.                                                     |
| [![OpenCV][OpenCV-badge]][OpenCV-url]                                                                                              | Used for capturing and processing video streams from the webcam.               |
| [![Face Recognition][FaceRec-badge]][FaceRec-url]                                                                                  | A high-level library (built on dlib) for face detection and recognition. |
| [![NumPy][NumPy-badge]][NumPy-url]                                                                                                  | Used for efficient numerical operations on image arrays.                       |

<br>

## 🚀 Getting Started

Follow these instructions to get the project running on your local machine.

### ✅ Prerequisites

* **Python 3.8+**
* **CMake and a C++ Compiler:** The `dlib` library (a dependency of `face_recognition`) is written in C++ and needs to be compiled from source.

    > **macOS:** Run `brew install cmake`
    >
    > **Windows:** Install [Visual Studio 2019 or newer](https://visualstudio.microsoft.com/downloads/) with the "C++ build tools" workload.
    >
    > **Linux:** Run `sudo apt-get install build-essential cmake`

### ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Brajesh31/Face-Recognition.git](https://github.com/Brajesh31/Face-Recognition.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd Face-Recognition
    ```
3.  **Create and activate a virtual environment (recommended):**
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```
4.  **Install the required Python packages:**
    ```sh
    pip install -r requirements.txt
    ```
    *(Note: This step may take several minutes as it needs to compile `dlib`.)*

<br>

## 🎬 Usage

1.  **Add known faces:**
    * Create a folder named `known_faces` in the root of the project directory.
    * Inside `known_faces`, add JPG or PNG images of the people you want to recognize.
    * **Important:** Name each image file with the person's name (e.g., `Brajesh Kumar.jpg`, `Elon Musk.png`).
2.  **Run the application:**
    ```sh
    python main.py
    ```
3.  A window will open showing your webcam feed. When a known face is recognized, a green box and their name will appear.
4.  The attendance will be logged in the `attendance.csv` file.
5.  Press **`q`** to quit the application.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 📬 Contact

Brajesh - [@Brajesh31 on GitHub](https://github.com/Brajesh31)

[Python-badge]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/
[OpenCV-badge]: https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white
[OpenCV-url]: https://opencv.org/
[FaceRec-badge]: https://img.shields.io/badge/Face_Recognition-0078D4?style=for-the-badge&logo=facepunch&logoColor=white
[FaceRec-url]: https://github.com/ageitgey/face_recognition
[NumPy-badge]: https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white
[NumPy-url]: https://numpy.org/
