import { Select, SelectItem } from "@nextui-org/react";


const FilterAnalitycs = () => {
  

    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-wrap items-end md:flex-nowrap m-4  gap-4">
            <Select
              labelPlacement="inside"
              label="Time"
              // // placeholder="Select an animal"
              className="w-48 ml-16 border-2"
            >
              <SelectItem>Last Month</SelectItem>
              <SelectItem>Last 6 Months</SelectItem>
              <SelectItem>Last Year</SelectItem>
            </Select>
          </div>
        </div>
      </div>
    );
};

export default FilterAnalitycs;
