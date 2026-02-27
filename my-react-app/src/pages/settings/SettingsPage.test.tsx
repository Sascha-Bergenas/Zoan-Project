import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SettingsPage from "./SettingsPage";
import * as userService from "./settingComponents/userService";

// Mockdata userService
vi.mock("./settingComponents/userService.ts", () => ({
  getCurrentUser: vi.fn().mockResolvedValue({
    id: "123"
  }),
  getUserProfile: vi.fn().mockResolvedValue({
    username: "TestUser",
    avatar_url: null
  }),
  updateUsername: vi.fn().mockResolvedValue(undefined),
  uploadAvatar: vi.fn()
}));
// Mockdata useTimer
vi.mock("../../contexts/TimerContext", () => ({
  useTimer: () => ({
    breakSettings: {
      deepMin: 30,
      meetingMin: 15,
      chillMin: null
    },
    setBreakSettings: vi.fn()
  })
}));

// Test för sparande av användarnamn
it("save username", async () => {
  render(<SettingsPage />);

  // Vänta tills inputen faktiskt innehåller värdet ‘TestUser’.
  await screen.findByDisplayValue("TestUser");

  const input = screen.getByTestId("username-input");

  await userEvent.clear(input);
  await userEvent.type(input, "Sascha");

  const button = screen.getByTestId("save-username-button");

  await userEvent.click(button);

  const success = await screen.findByTestId("success-username-message");

  expect(success).toBeInTheDocument();
});

//Test för disabled på upload-knappen
it("disable button when no picture is choosen", async () => {
  render(<SettingsPage />);

  await screen.findByLabelText("Användarnamn");

  const uploadButton = screen.getByTestId("disable-btn");

  expect(uploadButton).toBeDisabled();
});

//Test för enable på upload-knappen vid vald bild till uppladdning
it("enable button when picture is choosen", async () => {
  render(<SettingsPage />);

  await screen.findByDisplayValue("TestUser");

  const fileInput = screen.getByTestId("choose-file-input");

  const uploadButton = await screen.findByRole("button", {
    name: "Ladda upp vald bild"
  });

  expect(uploadButton).toBeDisabled();

  // mockar att användaren laddar upp en bild
  const file = new File(["dummy"], "avatar.png", {
    type: "image/png"
  });

  await userEvent.upload(fileInput, file);

  expect(uploadButton).toBeEnabled();
});

// Test för att se att uploadAvatar anropas vid knapptryck
it("calls uploadAvatar when button is clicked ", async () => {
  render(<SettingsPage />);

  await screen.findByDisplayValue("TestUser");

  const fileInput = screen.getByTestId("choose-file-input");

  const uploadButton = await screen.findByRole("button", {
    name: "Ladda upp vald bild"
  });

  const file = new File(["dummy"], "avatar.png", {
    type: "image/png"
  });

  await userEvent.upload(fileInput, file);

  await userEvent.click(uploadButton);

  expect(userService.uploadAvatar).toHaveBeenCalledWith("123", file);
});
