import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// You would need to update this with your actual API URL
const API_DOMAIN = 'http://localhost:8000/api/kits';

const CustomizeSoundSystemPage = ({ sourceScreen }) => {
  const [items, setItems] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedKits, setSelectedKits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEquipmentsAndKits();
  }, []);

  const fetchEquipmentsAndKits = async () => {
    try {
      const response = await axios.get(`${API_DOMAIN}/equipments-kits`);
      
      if (response.status === 200) {
        const { equipments, kits } = response.data;
        
        // Process equipments
        const processedItems = equipments.map(equipment => ({
          name: equipment.name,
          price: equipment.price,
          quantity: equipment.quantity,
          image: equipment.image,
        }));
        setItems(processedItems);
        
        // Process kits
        const processedKits = kits.map(kit => ({
          name: kit.name,
          price: kit.price,
          image: kit.image,
          isAdded: false,
          includedItems: kit.includedItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            image: item.image,
          })),
        }));
        setPlans(processedKits);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const showFullScreenImage = (imagePath) => {
    // Modal for showing full screen image
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    const img = document.createElement('img');
    img.src = imagePath;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.objectFit = 'contain';
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  };

  const showPlanDetailsDialog = (plan) => {
    // Create a modal for plan details
    const modal = document.getElementById('planDetailsModal');
    const modalTitle = document.getElementById('planDetailsTitle');
    const modalImage = document.getElementById('planDetailsImage');
    const modalItems = document.getElementById('planDetailsItems');
    
    if (modal && modalTitle && modalImage && modalItems) {
      modalTitle.textContent = plan.name;
      modalImage.src = plan.image;
      
      // Clear previous items
      modalItems.innerHTML = '';
      
      // Add included items
      plan.includedItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex items-center mb-4';
        itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg" />
          <div class="ml-4">
            <p class="text-lg font-medium">${item.name} (${item.quantity})</p>
          </div>
        `;
        modalItems.appendChild(itemElement);
      });
      
      // Show the modal
      modal.classList.remove('hidden');
    }
  };

  const closePlanDetailsModal = () => {
    const modal = document.getElementById('planDetailsModal');
    if (modal) {
      modal.classList.add('hidden');
    }
  };

  const handleAddKit = (plan, index) => {
    const updatedPlans = [...plans];
    updatedPlans[index].isAdded = !updatedPlans[index].isAdded;
    setPlans(updatedPlans);

    if (updatedPlans[index].isAdded) {
      setSelectedKits([...selectedKits, plan]);
    } else {
      setSelectedKits(selectedKits.filter(kit => kit.name !== plan.name));
    }
  };

  const handleItemQuantityChange = (item, index, change) => {
    const updatedItems = [...items];
    const newQuantity = Math.max(0, updatedItems[index].quantity + change);
    updatedItems[index].quantity = newQuantity;
    setItems(updatedItems);

    // Update selectedItems
    if (newQuantity === 0) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem.name !== item.name));
    } else {
      const existingItemIndex = selectedItems.findIndex(selectedItem => selectedItem.name === item.name);
      
      if (existingItemIndex !== -1) {
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems[existingItemIndex].quantity = newQuantity;
        setSelectedItems(updatedSelectedItems);
      } else if (newQuantity > 0) {
        setSelectedItems([...selectedItems, { ...item, quantity: newQuantity }]);
      }
    }
  };

  const handleAddItems = () => {
    // Check if user is signed up (you would need to implement this)
    const isSignedUp = localStorage.getItem('user_signup') === 'true';

    if (isSignedUp) {
      if (sourceScreen === 'bookingpage') {
        // Go back to previous page with selections
        navigate(-1, { 
          state: { 
            selectedItems: selectedItems,
            selectedKits: selectedKits 
          } 
        });
      } else {
        // Navigate to sound booking page
        navigate('/sound-booking', { 
          state: { 
            selectedItems: selectedItems,
            selectedKits: selectedKits 
          } 
        });
      }
    } else {
      // Store data and navigate to phone verification
      localStorage.setItem('soundpage', 'true');
      navigate('/phone-verification', { 
        state: { 
          selectedItems: selectedItems,
          selectedKits: selectedKits 
        } 
      });
    }
  };

  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalSelectedKits = selectedKits.length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4 text-black"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Event Addons</h1>
        </div>
      </div>

      {/* Hero Banner */}
      <div 
        className="w-full h-44 md:h-56 lg:h-64 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/event-banner.jpg')" }}
      ></div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {/* Kits Section */}
        <h2 className="text-lg font-bold mt-6 mb-3">Pick a Complete Setup for Your Event</h2>
        
        <div className="flex overflow-x-auto pb-4 gap-4">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className="min-w-[180px] bg-white rounded-xl shadow-md flex-shrink-0"
            >
              <div 
                className="h-32 rounded-t-xl bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${plan.image})` }}
                onClick={() => showPlanDetailsDialog(plan)}
              ></div>
              <div className="p-3 text-center">
                <h3 className="font-semibold text-base">{plan.name}</h3>
                <p className="text-gray-500 text-sm">₹{plan.price}</p>
                <button
                  onClick={() => handleAddKit(plan, index)}
                  className={`mt-2 py-1 px-4 rounded-xl text-white text-sm ${plan.isAdded ? 'bg-green-500' : 'bg-pink-600'}`}
                >
                  {plan.isAdded ? 'Added' : 'Add'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Individual Items Section */}
        <h2 className="text-lg font-bold mt-8 mb-4">Select Only What You Need for Your Event</h2>
        
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-4">
              <div className="flex flex-col sm:flex-row">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full sm:w-28 h-28 object-cover rounded-xl cursor-pointer"
                  onClick={() => showFullScreenImage(item.image)}
                />
                <div className="mt-3 sm:mt-0 sm:ml-4 flex-grow">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-500">₹{item.price}</p>
                  
                  <div className="flex items-center mt-3">
                    <button
                      onClick={() => handleItemQuantityChange(item, index, -1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-pink-50 text-pink-600 text-xl font-bold"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-semibold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleItemQuantityChange(item, index, 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-pink-50 text-pink-600 text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
        <button
          onClick={handleAddItems}
          className="w-full bg-pink-600 text-white py-3 rounded-xl font-medium"
        >
          <div className="text-center">
            <div>ADD</div>
            <div className="text-sm">Individual Items: {totalQuantity}</div>
          </div>
        </button>
      </div>

      {/* Plan Details Modal */}
      <div id="planDetailsModal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
          <div className="p-4">
            <h2 id="planDetailsTitle" className="text-xl font-bold text-center mb-3"></h2>
            <img id="planDetailsImage" className="w-full h-40 object-cover rounded-xl" alt="Plan" />
            <div id="planDetailsItems" className="mt-4 max-h-60 overflow-y-auto"></div>
            <button
              onClick={closePlanDetailsModal}
              className="mt-4 w-full py-2 bg-pink-600 text-white rounded-xl"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeSoundSystemPage;