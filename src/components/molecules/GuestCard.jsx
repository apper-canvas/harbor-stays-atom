import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";

const GuestCard = ({ guest, onClick }) => {
  return (
    <Card hover onClick={onClick} className="p-6 cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
{guest.first_name_c?.[0]}{guest.last_name_c?.[0]}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">
{guest.first_name_c} {guest.last_name_c}
            </h3>
<p className="text-sm text-gray-600">{guest.email_c}</p>
          </div>
        </div>
{guest.vip_status_c && (
          <Badge variant="vip">
            <ApperIcon name="Crown" size={14} className="mr-1" />
            VIP
          </Badge>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
<ApperIcon name="Phone" size={16} />
          <span>{guest.phone_c}</span>
          <span>{guest.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
<ApperIcon name="MapPin" size={16} />
          <span>{guest.address_c}</span>
          <span className="truncate">{guest.address}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
<ApperIcon name="CreditCard" size={16} />
          <span>{guest.id_type_c}: {guest.id_number_c}</span>
        </div>
      </div>

{guest.preferences_c && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-500 mb-2">Preferences:</p>
          <div className="flex flex-wrap gap-1">
            {(guest.preferences_c || "").split('\n').filter(Boolean).slice(0, 3).map((pref, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                {pref}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default GuestCard;