import React, { useState } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import Radio from "components/Radio/Radio"
import Select from "components/Select/Select";
import { useHistory } from "react-router-dom";
import { updateProfileInfo } from "../../components/Forgin/components/blogUtils";
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectAuthState, setPending } from 'app/auth/auth';

const DashboardEditProfile = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  const history = useHistory();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuthState);
  const user = auth.user;
  const pending = auth.pending;
  const authToken = auth.token;
  const url = auth.BASE_API_URL;



  const [profile, setProfile] = useState({
    id: user.user_id,
    username: "",
    password: "",
    bio: "",
    email: "",
    photo: "",
    role: "",
  });

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(setPending(true));
    const res = await updateProfileInfo(url, profile, authToken);
    dispatch(setPending(false));
    history.push(`/author/${res.id}`);
  }


  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    setProfile({ ...profile, photo: file })
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" autoComplete="chrome-off" onSubmit={handleFormSubmit}>
        <div className="block md:col-span-2">
          <Label>Logo</Label>
          <div className="flex flex-col items-center">
            <label htmlFor="file-upload" className="rounded-full overflow-hidden">
              <div className="bg-neutral-300 dark:bg-neutral-700 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-full flex items-center justify-center h-40 w-40">
                {selectedImage ? (
                  <img src={selectedImage} alt="Selected" className="h-full w-full object-cover rounded-full" />
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-neutral-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                )}
              </div>
              <input
                id="file-upload"
                name="image"
                type="file"
                className="sr-only"
                onChange={handleFileSelect}
              />
            </label>
            <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 mt-2"
              >
                <span>Upload a file</span>
              </label>
              <p className="pl-1 mt-2">or drag and drop</p>
            </div>
            <p className="text-xs text-neutral-500 mt-2">PNG, JPG, GIF up to 2MB</p>
          </div>
        </div>

        <label className="block">
          <Label>First name</Label>
          <Input
            placeholder="Example Doe"
            type="text"
            className="mt-1"
            value={profile.username}
            onChange={(event) =>
              setProfile({ ...profile, username: event.target.value })
            }
          />
        </label>
        <label className="block">
          <Label>Last name</Label>
          <Input
            placeholder="Doe"
            type="text"
            className="mt-1"
            value={profile.username}
            onChange={(event) => setProfile({ ...profile, bio: event.target.value })}
          />
        </label>
        <label className="block">
          <Label>Email address</Label>
          <Input
            type="email"
            placeholder="new Email"
            autoComplete="new-email"
            className="mt-1"
            value={profile.email}
            onChange={(event) =>
              setProfile({ ...profile, email: event.target.value })
            }
          />
        </label>
        <label className="block">
          <Label>Password</Label>
          <Input
            placeholder="new password"
            type="password"
            autoComplete="new-password"
            className="mt-1"
            value={profile.password}
            onChange={(event) =>
              setProfile({ ...profile, password: event.target.value })
            }
          />
        </label>

        <label className="block md:col-span-2">
          <Label>Bio</Label>

          <textarea
            className={`block w-full text-sm rounded-xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 mt-1`}
            rows={4}
            onChange={(event) =>
              setProfile({ ...profile, bio: event.target.value })
            }

          />
          <p className="mt-1 text-sm text-neutral-500">
            Brief description for your article. URLs are hyperlinked.
          </p>
        </label>
        <label className="block">
          <Label>Category</Label>

          <Select className="mt-1" onChange={(e) => {
            setProfile({ ...profile, role: e.target.value })
          }}>
            <option value="-1">– select –</option>
            <option value="D">Deveoper</option>
            <option value="B">Blind</option>
            <option value="BA">Blind Assistant</option>
            <option value="U">User</option>
          </Select>
          {/* </label> */}
        </label>
        <ButtonPrimary loading={pending} className="md:col-span-2" type="submit">
          Update profile
        </ButtonPrimary>
      </form>
    </div >
  );
};

export default DashboardEditProfile;
