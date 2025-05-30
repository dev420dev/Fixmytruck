import React, { useState, useEffect } from 'react';
     import { MapPin, Phone, Clock, Star, Truck, Wrench, Search, Navigation, Filter } from 'lucide-react';

     const TruckAssistSA = () => {
       const [userLocation, setUserLocation] = useState({ lat: -26.2041, lng: 28.0473 });
       const [searchRadius, setSearchRadius] = useState(40);
       const [serviceType, setServiceType] = useState('all');
       const [emergencyMode, setEmergencyMode] = useState(false);
       const [selectedDealer, setSelectedDealer] = useState(null);

       const [serviceProviders] = useState([
         {
           id: 1,
           name: "Highveld Truck Tyres",
           type: "tire",
           distance: 3.8,
           rating: 4.7,
           reviews: 89,
           phone: "011 234 5678",
           address: "123 Heidelberg Rd, Germiston, Gauteng",
           hours: "24/7 Emergency Service",
           services: ["Tyre Repair", "Tyre Replacement", "Roadside Assistance", "Wheel Alignment"],
           emergency: true,
           estimatedTime: "20-35 mins",
           calloutFee: "R450",
           province: "Gauteng"
         },
         {
           id: 2,
           name: "Boet's Mobile Mechanics",
           type: "mechanical",
           distance: 6.2,
           rating: 4.8,
           reviews: 134,
           phone: "082 567 8901",
           address: "87 Industrial Ave, Benoni, Gauteng",
           hours: "6:00 - 22:00 Weekdays, 24/7 Emergency",
           services: ["Engine Repair", "Gearbox", "Electrical", "Aircon Service", "Brake Systems"],
           emergency: true,
           estimatedTime: "30-50 mins",
           calloutFee: "R650",
           province: "Gauteng"
         },
         {
           id: 3,
           name: "N1 Truck Services",
           type: "full_service",
           distance: 8.5,
           rating: 4.9,
           reviews: 267,
           phone: "012 345 6789",
           address: "456 Pretoria Main Rd, Centurion, Gauteng",
           hours: "24/7 Service Available",
           services: ["Complete Diagnostics", "Tyre Service", "Engine Overhaul", "DOT Compliance", "Fleet Maintenance"],
           emergency: true,
           estimatedTime: "25-45 mins",
           calloutFee: "R550",
           province: "Gauteng"
         },
         {
           id: 4,
           name: "Kliptown Tyre Centre",
           type: "tire",
           distance: 12.1,
           rating: 4.5,
           reviews: 76,
           phone: "011 987 6543",
           address: "234 Gold Reef Rd, Soweto, Gauteng",
           hours: "5:00 - 23:00",
           services: ["Tyre Fitting", "Wheel Balancing", "Tyre Sales", "Puncture Repair"],
           emergency: false,
           estimatedTime: "45-70 mins",
           calloutFee: "R350",
           province: "Gauteng"
         },
         {
           id: 5,
           name: "Cape Town Truck Repair",
           type: "mechanical",
           distance: 15.3,
           rating: 4.6,
           reviews: 98,
           phone: "021 456 7890",
           address: "789 Voortrekker Rd, Goodwood, Western Cape",
           hours: "7:00 - 19:00, Emergency Call-outs",
           services: ["Diesel Engine Repair", "Hydraulics", "Suspension", "Clutch Repair"],
           emergency: true,
           estimatedTime: "40-60 mins",
           calloutFee: "R750",
           province: "Western Cape"
         },
         {
           id: 6,
           name: "Durban Heavy Vehicle Services",
           type: "full_service",
           distance: 18.7,
           rating: 4.4,
           reviews: 156,
           phone: "031 789 0123",
           address: "321 Umbilo Rd, Durban, KwaZulu-Natal",
           hours: "6:00 - 20:00, Weekend Emergency",
           services: ["Truck Servicing", "Trailer Repair", "Electrical Systems", "Air Brake Service"],
           emergency: true,
           estimatedTime: "50-80 mins",
           calloutFee: "R850",
           province: "KwaZulu-Natal"
         }
       ]);

       const [filteredProviders, setFilteredProviders] = useState(serviceProviders);

       useEffect(() => {
         filterProviders();
       }, [serviceType, searchRadius, emergencyMode]);

       const filterProviders = () => {
         let filtered = serviceProviders.filter(provider => {
           if (provider.distance > searchRadius) return false;
           if (serviceType !== 'all' && provider.type !== serviceType) return false;
           if (emergencyMode && !provider.emergency) return false;
           return true;
         });
         filtered.sort((a, b) => a.distance - b.distance);
         setFilteredProviders(filtered);
       };

       const getServiceTypeIcon = (type) => {
         switch(type) {
           case 'tire': return '🛞';
           case 'mechanical': return '🔧';
           case 'full_service': return '🏪';
           default: return '🚛';
         }
       };

       const handleEmergencyCall = (phone) => {
         alert(`Calling ${phone} for emergency service...`);
       };

       const requestService = (provider) => {
         setSelectedDealer(provider);
       };

       return (
         <div className="min-h-screen bg-gray-50">
           <div className="bg-green-600 text-white p-4 shadow-lg">
             <div className="flex items-center justify-between">
               <div className="flex items-center space-x-2">
                 <Truck className="h-8 w-8" />
                 <div>
                   <h1 className="text-xl font-bold">TruckAssist SA</h1>
                   <p className="text-xs opacity-90">South African Breakdown Services</p>
                 </div>
               </div>
               <button
                 onClick={() => setEmergencyMode(!emergencyMode)}
                 className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                   emergencyMode 
                     ? 'bg-red-500 text-white' 
                     : 'bg-white text-green-600 hover:bg-gray-100'
                 }`}
               >
                 {emergencyMode ? 'EMERGENCY MODE' : 'Emergency Mode'}
               </button>
             </div>
           </div>

           <div className="bg-white p-4 shadow-sm border-b">
             <div className="space-y-3">
               <div className="flex items-center space-x-2 text-sm text-gray-600">
                 <MapPin className="h-4 w-4" />
                 <span>Current Location: N1 Highway, Johannesburg, Gauteng</span>
                 <button className="text-green-600 hover:underline">Update Location</button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                   <select 
                     value={serviceType}
                     onChange={(e) => setServiceType(e.target.value)}
                     className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                   >
                     <option value="all">All Services</option>
                     <option value="tire">Tyre Service</option>
                     <option value="mechanical">Mechanical Repair</option>
                     <option value="full_service">Full Service Centre</option>
                   </select>
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Search Radius</label>
                   <select 
                     value={searchRadius}
                     onChange={(e) => setSearchRadius(Number(e.target.value))}
                     className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                   >
                     <option value={15}>15 km</option>
                     <option value={40}>40 km</option>
                     <option value={80}>80 km</option>
                     <option value={150}>150 km</option>
                   </select>
                 </div>
                 
                 <div className="flex items-end">
                   <button className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                     <Search className="h-4 w-4" />
                     <span>Search</span>
                   </button>
                 </div>
               </div>
             </div>
           </div>

           <div className="p-4">
             <div className="mb-4">
               <h2 className="text-lg font-semibold text-gray-800">
                 Found {filteredProviders.length} service providers within {searchRadius}km
               </h2>
               {emergencyMode && (
                 <p className="text-red-600 text-sm mt-1">
                   ⚡ Showing emergency services only
                 </p>
               )}
             </div>

             <div className="space-y-4">
               {filteredProviders.map((provider) => (
                 <div key={provider.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                   <div className="flex justify-between items-start mb-3">
                     <div className="flex items-start space-x-3">
                       <div className="text-2xl">{getServiceTypeIcon(provider.type)}</div>
                       <div>
                         <h3 className="text-lg font-semibold text-gray-800">{provider.name}</h3>
                         <div className="flex items-center space-x-2 text-sm text-gray-600">
                           <MapPin className="h-4 w-4" />
                           <span>{provider.distance}km away</span>
                           <span>•</span>
                           <Clock className="h-4 w-4" />
                           <span>ETA: {provider.estimatedTime}</span>
                         </div>
                         <div className="text-sm text-gray-600 mt-1">
                           <span className="font-medium text-green-600">Call-out fee: {provider.calloutFee}</span>
                         </div>
                       </div>
                     </div>
                     
                     <div className="text-right">
                       <div className="flex items-center space-x-1 justify-end">
                         <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                         <span className="text-sm font-medium">{provider.rating}</span>
                         <span className="text-sm text-gray-500">({provider.reviews})</span>
                       </div>
                       <div className="text-xs text-gray-500 mt-1">{provider.province}</div>
                     </div>
                   </div>

                   <div className="mb-3">
                     <p className="text-sm text-gray-600 mb-1">{provider.address}</p>
                     <p className="text-sm text-gray-600">{provider.hours}</p>
                   </div>

                   <div className="mb-4">
                     <div className="flex flex-wrap gap-2">
                       {provider.services.map((service, index) => (
                         <span 
                           key={index}
                           className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                         >
                           {service}
                         </span>
                       ))}
                     </div>
                   </div>

                   <div className="flex space-x-2">
                     <button
                       onClick={() => handleEmergencyCall(provider.phone)}
                       className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
                     >
                       <Phone className="h-4 w-4" />
                       <span>Call Now</span>
                     </button>
                     
                     <button
                       onClick={() => requestService(provider)}
                       className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                     >
                       <Wrench className="h-4 w-4" />
                       <span>Request Service</span>
                     </button>
                     
                     <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                       <Navigation className="h-4 w-4" />
                     </button>
                   </div>

                   {provider.emergency && (
                     <div className="mt-2 text-xs text-red-600 font-medium">
                       ⚡ 24/7 Emergency Service Available
                     </div>
                   )}
                 </div>
               ))}
             </div>
           </div>

           {selectedDealer && (
             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
               <div className="bg-white rounded-lg p-6 max-w-md w-full">
                 <h3 className="text-xl font-bold mb-4">Request Service</h3>
                 <p className="text-gray-600 mb-2">
                   Requesting service from <strong>{selectedDealer.name}</strong>
                 </p>
                 <p className="text-sm text-green-600 mb-4">
                   Call-out fee: <strong>{selectedDealer.calloutFee}</strong>
                 </p>
                 
                 <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Problem Description
                     </label>
                     <textarea 
                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                       rows={3}
                       placeholder="Describe the issue with your truck..."
                     ></textarea>
                   </div>
                   
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Truck Information
                     </label>
                     <input 
                       type="text"
                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                       placeholder="Make, Model, Year (e.g., 2018 MAN TGX, Volvo FH)"
                     />
                   </div>
                   
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Your Cell Number
                     </label>
                     <input 
                       type="tel"
                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                       placeholder="082 123 4567"
                     />
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Current Location Details
                     </label>
                     <input 
                       type="text"
                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                       placeholder="e.g., N1 North bound, km marker 45, near Midrand"
                     />
                   </div>
                 </div>
                 
                 <div className="flex space-x-3 mt-6">
                   <button
                     onClick={() => setSelectedDealer(null)}
                     className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                   >
                     Cancel
                   </button>
                   <button
                     onClick={() => {
                       alert('Service request sent! The provider will contact you shortly on your cell number.');
                       setSelectedDealer(null);
                     }}
                     className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                   >
                     Send Request
                   </button>
                 </div>
               </div>
             </div>
           )}
         </div>
       );
     };

     export default TruckAssistSA;
