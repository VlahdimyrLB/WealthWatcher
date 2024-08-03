import React from "react";

const BudgetsPage = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-1">
        <div className="lg:-mt-10 -ml-3">
          <div className="text-[17px] font-semibold opacity-80 mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>Menu</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Calendar</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>
      <div className="flex-1">Computation</div>
    </div>
  );
};

export default BudgetsPage;
