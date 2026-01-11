
import React from 'react';

export const BREED_CATEGORIES = [
  {
    name: "Popular Doodles & Mixes",
    breeds: ["Bernedoodle", "Goldendoodle", "Labradoodle", "Aussiedoodle", "Cavapoo", "Cockapoo"]
  },
  {
    name: "Working Group",
    breeds: ["Bernese Mountain Dog", "Boxer", "German Shepherd", "Great Dane", "Rottweiler", "Siberian Husky"]
  },
  {
    name: "Sporting Group",
    breeds: ["Golden Retriever", "Labrador Retriever", "Cocker Spaniel", "English Springer Spaniel", "Vizsla"]
  },
  {
    name: "Herding Group",
    breeds: ["Australian Shepherd", "Border Collie", "Old English Sheepdog", "Shetland Sheepdog"]
  },
  {
    name: "Toy & Small Group",
    breeds: ["Poodle (Toy)", "Chihuahua", "Pomeranian", "Pug", "Yorkshire Terrier", "French Bulldog"]
  },
  {
    name: "Non-Sporting Group",
    breeds: ["Poodle (Standard)", "Bulldog", "Dalmatian", "Shiba Inu"]
  }
];

export const FEATURES = [
  { icon: <i className="fa-solid fa-utensils"></i>, text: "Personalized nutrition plans" },
  { icon: <i className="fa-solid fa-heart-pulse"></i>, text: "Breed-specific health alerts" },
  { icon: <i className="fa-solid fa-person-running"></i>, text: "Custom exercise requirements" },
  { icon: <i className="fa-solid fa-graduation-cap"></i>, text: "Training strategies that work" },
  { icon: <i className="fa-solid fa-scissors"></i>, text: "Complete grooming schedules" }
];
