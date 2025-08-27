# Quiz Master Mobile App

A cross-platform mobile quiz application built with React Native and Expo that supports both Android and iOS.

## Features

- 📱 **Cross-platform**: Works on both Android and iOS
- 🎯 **Multiple Categories**: General Knowledge, Science, History, Sports, Technology
- 📊 **Progress Tracking**: Track your quiz performance and statistics
- 🏆 **Achievements System**: Unlock achievements as you progress
- ⚙️ **Customizable Settings**: Personalize your quiz experience
- 🎨 **Modern UI**: Beautiful, intuitive interface with smooth animations
- 📈 **Performance Analytics**: Detailed statistics and progress tracking

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── LoadingSpinner.js
│   ├── CustomButton.js
│   └── Card.js
├── screens/            # Application screens
│   ├── HomeScreen.js
│   ├── QuizScreen.js
│   ├── ResultScreen.js
│   ├── ProfileScreen.js
│   └── SettingsScreen.js
├── navigation/         # Navigation configuration
│   └── AppNavigator.js
├── styles/            # Theme and styling
│   └── theme.js
├── utils/             # Utility functions
├── hooks/             # Custom React hooks
└── context/           # React context providers
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd QuizAppMobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For web
   npm run web
   ```

### Development Setup

1. **Install Expo CLI globally**
   ```bash
   npm install -g expo-cli
   ```

2. **Install Expo Go app** on your mobile device from App Store or Google Play

3. **Scan QR code** displayed in terminal or browser to run the app on your device

## Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser

## Dependencies

### Core Dependencies
- **React Native**: Cross-platform mobile development framework
- **Expo**: Development platform for React Native apps
- **React Navigation**: Navigation library for React Native

### UI Dependencies
- **expo-linear-gradient**: Gradient backgrounds and elements
- **expo-font**: Custom font loading
- **react-native-screens**: Native screen management
- **react-native-safe-area-context**: Safe area handling
- **react-native-gesture-handler**: Gesture recognition

## Features Overview

### 🏠 Home Screen
- Welcome interface with category selection
- Quick stats display
- Beautiful gradient-based category cards

### 🎯 Quiz Screen
- Timer-based questions
- Multiple choice answers
- Progress tracking
- Quit functionality

### 📊 Result Screen
- Score display with percentage
- Performance feedback
- Retry and home navigation options

### 👤 Profile Screen
- User statistics
- Achievement system
- Progress tracking

### ⚙️ Settings Screen
- App preferences
- Quiz settings
- Account management
- About information

## Customization

### Adding New Quiz Categories

1. Update the `sampleQuizData` object in `src/screens/QuizScreen.js`
2. Add the new category to the `quizCategories` array in `src/screens/HomeScreen.js`
3. Choose appropriate gradient colors for the category

### Modifying Themes

Edit the theme configuration in `src/styles/theme.js` to customize:
- Colors and gradients
- Typography settings
- Spacing and layout
- Shadow effects

### Adding New Components

Create reusable components in the `src/components/` directory following the existing patterns.

## Building for Production

### Android
```bash
expo build:android
```

### iOS
```bash
expo build:ios
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- [ ] User authentication and cloud sync
- [ ] Multiplayer quiz modes
- [ ] Custom quiz creation
- [ ] Dark mode support
- [ ] Offline quiz caching
- [ ] Social sharing features
- [ ] Leaderboards
- [ ] Quiz difficulty levels
- [ ] Audio questions
- [ ] Image-based questions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

---

**Happy Quizzing! 🎉**