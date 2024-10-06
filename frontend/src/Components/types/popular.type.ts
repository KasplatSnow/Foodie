// boxesData.js
type Box = {
  title: string // The title of the box
  content: string // The content or description of the box
  image: string // The URL of the image associated with the box
}

export const boxes: Box[] = [
  {
    title: 'Bento Box',
    content: 'This is some content for box 3. You can add more details here.',
    image:
      'https://images.unsplash.com/photo-1488324346298-5ad3d8f96d0d?q=80&w=2458&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Sushi House',
    content: 'This is some content for box 1. You can add more details here.',
    image:
      'https://images.unsplash.com/photo-1540224769541-7e6e20a42330?q=80&w=3688&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Whiskey Bar',
    content: 'This is some content for box 2. You can add more details here.',
    image:
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Blue Monkey',
    content: 'This is some content for box 4. You can add more details here.',
    image:
      'https://images.unsplash.com/photo-1483648969698-5e7dcaa3444f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]
