import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SettingsPage from "./SettingsPage";

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
