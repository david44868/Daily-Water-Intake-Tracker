import React, { useState } from "react";
import { Dialog } from "@mui/material";

export default function PopUpModal({ open, onClose, onSubmit }) {
  const [waterAmount, setWaterAmount] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(waterAmount);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <label>
          How many cups have you drank?
        </label>
        <div>
            <input
                type="number"
                value={waterAmount}
                onChange={(e) => setWaterAmount(e.target.value)}
            />
            <button class="my-button" type="submit">Add Water</button>
        </div>
        <img src="water.png" width="160px" height="200px"></img>
      </form>
    </Dialog>
  );
};