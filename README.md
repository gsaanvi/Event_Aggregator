
# 🎓 College Event Aggregator

A centralized web platform designed to enable students to discover, save, and register for college events efficiently from a single interface.

---

## 📌 Overview

In many colleges, information about events is dispersed across multiple channels such as messaging groups, social media platforms, and physical notice boards. This fragmentation often leads to reduced visibility and missed opportunities for student participation.

The **College Event Aggregator** addresses this issue by providing a structured and unified platform where students can easily explore and engage with ongoing and upcoming events.

---

## ❗ Problem Statement

* Lack of a centralized platform for event discovery
* Students frequently miss relevant events
* Event organizers face challenges in reaching a wider audience

---

## 👥 User Roles

### 🔐 Admin

* Secure access to a protected administrative panel
* Ability to create, update, and delete event listings
* Monitor engagement through saved event counts

### 🎓 Student

* Register and authenticate on the platform
* Browse a curated list of upcoming events
* Search events by name or category
* Apply filters based on event type (Cultural, Technical, Sports, Workshop, Others)
* Save events to a personalized list
* Access saved events at any time
* Register for events via external links
* Receive timely email reminders prior to events

---

## ✨ Key Features

* Centralized event discovery system
* Efficient search and filtering capabilities
* Personalized event bookmarking (My List)
* Automated email reminders
* Administrative control panel for event management
* Integration with external registration platforms

> Note: AI-based event description generation is not included in the current version and may be incorporated in future iterations.

---

## 🗄️ Data Structure

### Users

* Unique identifier
* Name
* Email
* Role (Admin / Student)
* Academic year
* Branch

### Events

* Unique identifier
* Title
* Date and time
* Venue
* Category
* Tags
* Registration link
* Organizer details
* Creator reference

### Saved Events

* Unique identifier
* Student reference
* Event reference
* Timestamp of saving

---

## 📄 Application Pages

| Page                             | Access   |
| -------------------------------- | -------- |
| Landing Page                     | Public   |
| Authentication (Sign Up / Login) | Public   |
| Event Feed                       | Students |
| Event Detail Page                | Students |
| My List                          | Students |
| Admin Panel                      | Admin    |
| Event Management (Create/Edit)   | Admin    |

---

## 🧩 Event Card Components

Each event is presented in a structured card format containing:

* Event title
* Date, time, and venue details
* Category classification
* Organizer information
* Option to save the event
* Registration link for external access

---

## 📝 Event Creation (Admin)

Administrators can create and manage events using the following fields:

* Title
* Date and time
* Venue
* Category
* Tags
* Registration link
* Organizer name
* Organizer affiliation (optional)

---

## 📌 Future Scope

* Integration of AI-based content generation
* User-submitted event workflow with approval system
* Real-time notifications and updates
* Expansion to mobile platforms

---

## 🤝 Contribution

This project is developed as part of an academic initiative. Suggestions and improvements are welcome.

---

## 📧 Contact

For event submissions or queries, please reach out through the designated communication channel.

---

## ⭐ Acknowledgement

This project aims to enhance student engagement and streamline access to campus events through a unified digital solution.
