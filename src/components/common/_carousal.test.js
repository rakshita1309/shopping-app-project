import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Carousel from './Carousal';

describe('Carousel Component', () => {
  const images = [
    'https://via.placeholder.com/240x240?text=Image+1',
    'https://via.placeholder.com/240x240?text=Image+2',
    'https://via.placeholder.com/240x240?text=Image+3',
  ];

  it('should render correctly with images', () => {
    render(<Carousel images={images} />);

    const imgElement = screen.getByAltText('carousel-0');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toBe(images[0]);
  });

  it('should show navigation buttons when buttonEnabled is true', () => {
    render(<Carousel images={images} buttonEnabled={true} />);
    
    const prevButton = screen.getByText('‹');
    const nextButton = screen.getByText('›');
    
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('should not show navigation buttons when buttonEnabled is false', () => {
    render(<Carousel images={images} buttonEnabled={false} />);
    
    const prevButton = screen.queryByText('‹');
    const nextButton = screen.queryByText('›');
    
    expect(prevButton).toBeNull();
    expect(nextButton).toBeNull();
  });

  it('should cycle images when clicking the "next" button', async () => {
    render(<Carousel images={images} buttonEnabled={true} interval={1000} />);
    
    const nextButton = screen.getByText('›');
    
    const firstImage = screen.getByAltText('carousel-0');
    expect(firstImage.src).toBe(images[0]);
    
    // Click next button
    fireEvent.click(nextButton);
    
    const secondImage = screen.getByAltText('carousel-1');
    expect(secondImage.src).toBe(images[1]);
  });

  it('should cycle images when clicking the "previous" button', async () => {
    render(<Carousel images={images} buttonEnabled={true} interval={1000} />);
    
    const prevButton = screen.getByText('‹');
    
    // Set the index to the second image (to test backward navigation)
    const nextButton = screen.getByText('›');
    fireEvent.click(nextButton); // go to image 1
    fireEvent.click(nextButton); // go to image 2
    
    const thirdImage = screen.getByAltText('carousel-2');
    expect(thirdImage.src).toBe(images[2]);
    
    // Click previous button
    fireEvent.click(prevButton);
    
    const secondImage = screen.getByAltText('carousel-1');
    expect(secondImage.src).toBe(images[1]);
  });

  it('should handle empty images array gracefully', () => {
    render(<Carousel images={[]} />);
    
    // No images should be rendered
    const imgElement = screen.queryByAltText('carousel-0');
    expect(imgElement).toBeNull();
  });

  it('should handle undefined images prop gracefully', () => {
    render(<Carousel images={undefined} />);
    
    // No images should be rendered
    const imgElement = screen.queryByAltText('carousel-0');
    expect(imgElement).toBeNull();
  });
});
