export type Testimonial = {
  name: string;
  role: string;
  photo: string;
  text: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Aarav Patel',
    role: 'Product Manager',
    photo: '/profile.svg',
    text: 'Shahu is a diligent developer who delivers high-quality work on time.'
  },
  {
    name: 'Isha Sharma',
    role: 'Designer',
    photo: '/profile.svg',
    text: 'Great collaboration and attention to detail. Highly recommended!'
  },
  {
    name: 'Rohit Verma',
    role: 'CTO',
    photo: '/profile.svg',
    text: 'Excellent understanding of modern web practices and performance.'
  }
];