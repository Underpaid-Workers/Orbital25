# NUS Orbital 25 - EcoDex
EcoDex is a nature discovery app that combines automated species identification with a Pokédex-style inventory, rarity-based scoring, and social features to make biodiversity exploration educational, gamified, and community-driven.

## How to use
**Android Users** can download the following apk for testing: [EcoDex_Milestone2](https://drive.google.com/file/d/1Eia5uSv5JmlyR9LZ7INyslp70VUvKBp2/view?usp=drive_link)

## Features
### User Account Management
In order to allow users to store their captured entries persistently, users will need to have their own accounts.
- Account management is implemented through Supabase Authentication, with Login and Signup functionality. 
- User data, such as display names and entry data will be uniquely tied to each user.
<p align="center">
   <img width="278" alt="Sign up screen" src="https://github.com/user-attachments/assets/94745656-79c6-4adf-bd03-36b5967c22a8">
   <img width="278" alt="Login Screen" src="https://github.com/user-attachments/assets/dfb4f387-b2d2-44f2-8a7a-98f170bcdaf8">
</p>

### Captured Species
Adding/Viewing/Deleting Entries
For adding entries, users will:
- Capture the species using the Camera function.
- Have the species be identified by the API, returning its name, description, and some basic facts about it. It will also be tagged with the relevant environment and species type tags. Users will then be able to input additional observations they made during the capture.
- Once the entry is submitted, it will be uploaded to the database and be available for viewing in the inventory screen.
<p align="center">
   <img width="278" alt="Inventory screen" src="https://github.com/user-attachments/assets/ca0e5d9c-f1d1-4ee5-b63f-472a2663eedd">
   <img width="278" alt="Entry Details Screen" src="https://github.com/user-attachments/assets/c8a08943-533e-45bc-b451-a19ab16cd2dc">
</p>

### Identifying Entries (with API)
- Entries are identified using captured images through the [HuggingFaceAPI](https://huggingface.co/). Species information is then retrieved using Google's [Gemini API](https://ai.google.dev/)
- Various data about the entry will be returned, such as:
  - Description of the species, some fun facts
  - Height, Weight, Lifespan

### Social Features
Building on EcoDex’s community focus, the Social tab brings your discoveries into a shared space:
- Friend Management
  - Send and accept friend requests to build your exploration network.
  - View each friend’s rarity score and total captures to compare progress side‑by‑side.\
- Global Leaderboard
  - See the top EcoDex users by rarity score or species count.
  - Track your rank in real time and aim to climb higher with every new find.

### Interactive Map
Visualize biodiversity across your local area and the world with our Map tab:
- Personal vs. Global Views
  - Toggle between your own submitted entries and all public observations.
- Advanced Filtering
  - Filter markers by rarity tier, environment (e.g., aquatic, terrestrial), or species type (plant vs. animal).
- Hotspot Discovery
  - Identify concentration zones of rare or unique species to plan your next outing.

## Tech Stack
- React Native
- Supabase
- Expo, Expo EAS
- Vitest 
- Git, Github
