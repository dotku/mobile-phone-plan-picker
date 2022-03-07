const verizon = (() => {
  const verizonPlans = {
    "5G Start": [70, 60, 45, 35, 30],
  };

  const getUnlimitedPlanPrice = (numberOfUsers) => {
    const { length } = verizonPlans["5G Start"];
    if (numberOfUsers < length) {
      return numberOfUsers * verizonPlans["5G Start"][numberOfUsers - 1];
    } else {
      return numberOfUsers * verizonPlans["5G Start"][length - 1];
    }
  };

  return {
    label: "Verizon",
    website: "https://www.verizon.com/plans/unlimited/#plans",
    getUnlimitedPlanPrice: getUnlimitedPlanPrice,
    perks: [
      {
        name: "5G Start",
        price: getUnlimitedPlanPrice,
        VideoStream: { name: "Disney+ 6 mo" },
        Game: [
          { name: "Apple Carcade 6 mo" },
          { name: "Google Play Pass 6 mo" },
        ],
        Music: [{ name: "Apple Music 6 mo" }],
      },
      {
        name: "5G Play More",
        price: 45,
        perkValue: 18.98,
        VideoStream: { name: "Disney+ Bunlde" },
        Game: [{ name: "Apple Carcade" }, { name: "Google Play Pass" }],
        Music: [{ name: "Apple Music 6 mo" }],
      },
      {
        name: "5G Do More",
        price: 45,
        perkValue: 35.99,
        internet: { name: "50% off hotspot" },
        network: { name: "12 mo 1 TravelPass" },
        cloud: { name: "Verizon Cloud 600 GB" },
        VideoStream: { name: "Disney+ Bunlde 6 mo" },
        Game: [
          { name: "Apple Carcade 6 mo" },
          { name: "Google Play Pass 6 mo" },
        ],
        Music: [{ name: "Apple Music 6 mo" }],
      },
      {
        name: "5G Get More",
        price: 55,
        perkValue: 64.96,
        internet: { name: "50% off hotspot" },
        network: { name: "12 mo 1 TravelPass" },
        cloud: { name: "Verizon Cloud 600 GB" },
        VideoStream: { name: "Disney+ Bunlde" },
        Game: [{ name: "Apple Carcade" }, { name: "Google Play Pass" }],
        Music: [{ name: "Apple Music" }],
      },
    ],
  };
})();

export default verizon;
