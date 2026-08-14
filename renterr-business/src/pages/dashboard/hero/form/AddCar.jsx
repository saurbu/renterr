import React, { useRef, useState } from "react";
import { Plus, X, ArrowLeft } from "lucide-react";

const AddCar = ({ onBack }) => {
  const [images, setImages] = useState([]);
  const fileRef = useRef()
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    pricePerDay : "",
    gearType: "",
    engineType: "",
    seats: "",
    state: "",
    district: "",

  })

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 1) {
      alert("At least one image is required");
      return;
    }
    try{
      const token = localStorage.getItem("token")
      const data = new FormData()

      data.append("brand", formData.brand)
      data.append("model", formData.model)
      data.append("pricePerDay", formData.pricePerDay)
      data.append("gearType", formData.gearType)
      data.append("engineType", formData.engineType)
      data.append("seats", formData.seats)
      data.append("state", formData.state)
      data.append("district", formData.district)

      images.forEach((img) =>{
        data.append("carImages", img.file)
      })

      const res = await fetch(
        "http://localhost:8000/api/car/addCar",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const result = await res.json();

      if (result.success) {

        setImages([]);

        setFormData({
          brand: "",
          model: "",
          pricePerDay: "",
          gearType: "",
          engineType: "",
          seats: "",
          state: "",
          district: "",
        });

        onBack();
      } else {
        alert(result.message || "Failed to add car");
      }
          }catch (error) {
            console.log(error);
            alert("something was wrong")
            
          }
        };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div className="h-full bg-white p-6 overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg border cursor-pointer"
        >
          <ArrowLeft size={18} />
        </button>

        <h1 className="text-2xl font-bold">
          Add New Car
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
      >
        <div className="bg-gray-50 rounded-xl p-5">
        <div className="grid grid-cols-2 gap-5">
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand Name"
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Model"
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleChange}
            placeholder="Price Per Day"
            className="border p-3 rounded-lg"
            required
          />

          <select
            className="border p-3 rounded-lg cursor-pointer"
            name="gearType"
            value={formData.gearType}
            onChange={handleChange}
            required
          >
            <option value="">Gear Type</option>
            <option>Manual</option>
            <option>Automatic</option>
          </select>

          <select
            className="border p-3 rounded-lg cursor-pointer"
            name="engineType"
            value={formData.engineType}
            onChange={handleChange}
            required
          >
            <option value="">Select Engine Type</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Petrol/CNG</option>
            <option>Electric</option>
          </select>

          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            placeholder="Number of Seats"
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter State"
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="text"
            name="district"
            value={formData.District}
            onChange={handleChange}
            placeholder="Enter District"
            className="border p-3 rounded-lg"
            required
          />
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-4">
            Car Images ({images.length}/5)
          </h3>

          <div className="flex gap-6">
            <div className="flex flex-wrap gap-3 w-[70%] min-h-[140px] p-3">
              {images.length === 0 ? (
                <div className="text-gray-400 flex items-center">
                  No Images Added
                </div>
              ) : (
                images.map((img, index) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    <img
                      src={img.preview}
                      alt=""
                      className="w-24 h-24 rounded-lg object-cover "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeImage(index)
                      }
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="flex-1">
              <input
                ref={fileRef}
                type="file"
                multiple
                id="carImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              <button
                type="button"
                onClick={() =>
                  fileRef.current.click()
                }
                className="w-full h-[140px] border-2 border-dashed rounded-xl flex flex-col cursor-pointer items-center justify-center gap-2 hover:bg-gray-100"
              >
                <Plus size={28} />
                <span>Add Images</span>
                <span className="text-xs text-gray-500">
                  Maximum 5 Images
                </span>
              </button>
            </div>
          </div>
        </div>
        </div>
        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 rounded-lg border cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-red-500 text-white cursor-pointer"
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;