import React, { ReactNode, useState } from "react";
import { ColumnType } from "@/app/(main)/contacts/page";
import Image from "next/image";
import CustomInput from "./custom-input";
import { Repeat2, Trash, Pencil, X } from "lucide-react";
import CustomButton from "./custom-button";
import { ContactType } from "@/app/(main)/contacts/page";
import { isValidEmail, isValidPhoneNumber } from "@/lib/utils";
import { useMutation, useQueryClient } from "@/lib/react-query-hook";
import { fetchWithAuthorization } from "@/lib/http-helper";
import CustomModal from "./custom-modal";
import { cn } from "@/lib/utils";

type PropTypes = {
  columns: ColumnType;
  data: ContactType[];
};

const RowText = ({ text, className}: { text: string, className?: string }) => {
  return (
    <p className={cn(`text-lg font-semibold text-[#083F46] line-clamp-1 w-full overflow-hidden text-ellipsis`, className)}>
      {text}
    </p>
  );
};

const CustomTable = ({ columns, data }: PropTypes) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editRow, setEditRow] = useState<number | undefined>();
  const [selectedRow, setSelectedRow] = useState<ContactType>({
    id: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    userId: "",
  });

  const cancelSelection = () => {
    setSelectedRow({
      id: "",
      name: "",
      email: "",
      phone: "",
      gender: "",
      userId: "",
    });
    setEditRow(undefined);
  };

  console.log("modal", isUpdateModalOpen);

  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutateAsync: updateMutation } = useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      phone: string;
      gender: string;
    }) =>
      fetchWithAuthorization({
        method: "PUT",
        url: `/contacts/${selectedRow.id}`,
        data,
      }),
    onSuccess: () => {
      cancelSelection();
      queryClient.invalidateQueries("all-contacts" as any);
      setIsUpdateModalOpen(true);
    },
  });

  const { isPending: isDeleting, mutateAsync: deleteMutation } = useMutation({
    mutationFn: () =>
      fetchWithAuthorization({
        method: "DELETE",
        url: `/contacts/${selectedRow.id}`,
      }),
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      cancelSelection();
      queryClient.invalidateQueries("all-contacts" as any);
    },
  });

  const onDelete = () => {
    deleteMutation();
  };

  const updateData = () => {
    if (isValidEmail(selectedRow.email)) {
      if (isValidPhoneNumber(selectedRow.phone)) {
        updateMutation({
          name: selectedRow.name,
          email: selectedRow.email,
          phone: selectedRow.phone,
          gender: selectedRow.gender,
        });
      } else {
        alert("Please enter a valid phone number with 10 digits only.");
      }
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div
      className={`w-full h-[50vh] bg-white rounded-3xl px-3 py-5 grid grid-cols-6 gap-x-3 gap-y-4 overflow-scroll scroll-smooth items-center auto-rows-min`}
    >
      {columns.map((column, index) => {
        if (column.key === "avatar" || column.key === "actionBtns") {
          return <div key={index}></div>;
        } else {
          return (
            <p className="text-md font-bold text-[#083F46]" key={index}>
              {column.title}
            </p>
          );
        }
      })}
      {data?.length > 0 ? (
        <>
          {data?.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {columns.map((column, colIndex) => {
                if (column.key === "avatar") {
                  return (
                    <div
                      className="flex w-full items-center justify-center h-[10vh]"
                      key={column.key + rowIndex}
                    >
                      {row.gender === "male" ? (
                        <Image
                          src={"/male-avatar.png"}
                          alt="male-avatar"
                          width={50}
                          height={50}
                        />
                      ) : (
                        <Image
                          src={"/female-avatar.png"}
                          alt="male-avatar"
                          width={50}
                          height={50}
                        />
                      )}
                    </div>
                  );
                } else if (column.key === "name") {
                  return editRow === rowIndex ? (
                    <CustomInput
                      placeHolder={"full name"}
                      value={selectedRow?.name || ""}
                      onChange={(event) => {
                        setSelectedRow((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }));
                      }}
                      className="placeholder:text-lg bg-slate-100 w-full rounded-none p-1"
                      key={column.key + rowIndex}
                    />
                  ) : (
                    <RowText key={column.key + rowIndex} text={row.name} />
                  );
                } else if (column.key === "gender") {
                  return editRow === rowIndex ? (
                    <div
                      onClick={() => {
                        setSelectedRow((prev) => ({
                          ...prev,
                          gender:
                            selectedRow?.gender === "male" ? "female" : "male",
                        }));
                      }}
                      className="flex gap-3 items-center bg-slate-100 w-full justify-center py-1 hover:cursor-pointer px-1"
                      key={column.key + rowIndex}
                    >
                      <RowText text={selectedRow?.gender ?? row.gender} />
                      <Repeat2 className="text-[#083F46" />
                    </div>
                  ) : (
                    <RowText key={column.key + rowIndex} text={row.gender} />
                  );
                } else if (column.key === "email") {
                  return editRow === rowIndex ? (
                    <CustomInput
                      placeHolder={"e-mail"}
                      value={selectedRow?.email || ""}
                      onChange={(event) => {
                        setSelectedRow((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }));
                      }}
                      className="placeholder:text-lg bg-slate-100 w-full rounded-none p-1"
                      key={column.key + rowIndex}
                    />
                  ) : (
                    <RowText text={row.email} key={column.key + rowIndex} />
                  );
                } else if (column.key === "phoneNumber") {
                  return editRow === rowIndex ? (
                    <CustomInput
                      type="number"
                      placeHolder={"phone number"}
                      value={selectedRow?.phone || ""}
                      onChange={(event) => {
                        setSelectedRow((prev) => ({
                          ...prev,
                          phone: event.target.value.toString(),
                        }));
                      }}
                      className="placeholder:text-lg bg-slate-100 w-full rounded-none p-1"
                      key={column.key + rowIndex}
                    />
                  ) : (
                    <RowText key={column.key + rowIndex} text={row.phone} />
                  );
                } else if (column.key === "actionBtns") {
                  return (
                    <div
                      key={column.key + rowIndex}
                      className="flex gap-5 items-center w-full justify-center"
                    >
                      {editRow === rowIndex ? (
                        <>
                          <CustomButton
                            className={`text-white ${
                              isUpdating ? "w-full" : "w-3/4"
                            }`}
                            variant="primary"
                            handleClick={updateData}
                            loading={isUpdating}
                            disabled={
                              !(
                                selectedRow.email &&
                                selectedRow.name &&
                                selectedRow.gender &&
                                selectedRow.phone
                              ) || isUpdating
                            }
                          >
                            Save
                          </CustomButton>
                          {!isUpdating && (
                            <X
                              className="text-[#083F46] hover:cursor-pointer"
                              onClick={cancelSelection}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          <Pencil
                            onClick={() => {
                              setSelectedRow(row);
                              setEditRow(rowIndex);
                            }}
                            className="text-[#083F46] hover:cursor-pointer"
                          />
                          <Trash
                            onClick={() => {
                              setSelectedRow(row);
                              setIsDeleteModalOpen(true);
                            }}
                            className="text-[#083F46] hover:cursor-pointer"
                          />
                        </>
                      )}
                    </div>
                  );
                }
              })}
            </React.Fragment>
          ))}
        </>
      ) : (
        <div className="col-span-6 flex items-center justify-center">
          <RowText className={"w-1/4"} text={"There are no contact records"} />
        </div>
      )}
      <CustomModal
        open={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
        }}
      >
        <div className="flex flex-col justify-start items-center gap-8 py-6 px-10">
          <p className="text-lg font-semibold text-[#083F46]">
            Your contact has been deleted successfully!
          </p>
          <CustomButton
            className="text-white text-lg"
            variant="primary"
            handleClick={() => setIsUpdateModalOpen(false)}
          >
            Okay
          </CustomButton>
        </div>
      </CustomModal>
      <CustomModal
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
      >
        <div className="flex flex-col justify-start items-center gap-8 py-6 px-10">
          <p className="text-lg font-semibold text-[#083F46]">
            Do you want to delete the contact “{selectedRow.name}”?
          </p>
          <div className="flex w-1/2 justify-between items-center">
            <CustomButton
              className="text-white text-lg"
              variant="primary"
              handleClick={onDelete}
              disabled={isDeleting}
              loading={isDeleting}
            >
              Yes
            </CustomButton>
            <CustomButton
              className="text-lg font-semibold border border-[#083F46]"
              variant="secondary-outline"
              handleClick={() => {
                setIsDeleteModalOpen(false);
                cancelSelection()
              }}
            >
              Cancel
            </CustomButton>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default CustomTable;
