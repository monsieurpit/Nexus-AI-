import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('lua', slug, title, keywords, content);

export const CODE_LUA = [
  c('basics', 'Lua basics: variables, tables, strings, control flow, functions, metatables', ['lua basics', 'lua tables', 'lua for loop', 'lua functions', 'lua string', 'lua metatables', 'lua pairs ipairs', 'lua oop', 'lua nil'],
    `Variables: local x = 10 (always use local; globals are slow and leak), types: nil, boolean, number, string, table, function. Only nil and false are falsy (0 and "" are truthy). Not-equal is ~=. Concatenate with .. ("Hi " .. name). Length # (#"abc", #array). Comments: -- line, --[[ block ]].
Control: if a > 1 then ... elseif a == 1 then ... else ... end; while cond do ... end; repeat ... until cond; numeric for i = 1, 10, 2 do ... end; generic for: for i, v in ipairs(list) do (array part, in order, stops at nil) / for k, v in pairs(t) do (all keys, any order); break; goto continue with ::continue:: label.
Tables are the only data structure, arrays start at 1: local fruits = {"apple", "pear"}; table.insert(fruits, "kiwi"); table.insert(fruits, 1, "fig"); table.remove(fruits, 2); table.concat(fruits, ", "); table.sort(t, function(a, b) return a.score > b.score end); dictionaries: local p = { name = "Ana", hp = 100 }; p.name; p["hp"]; p.level = 3; p.level = nil (delete). Avoid holes (nil) in arrays (# becomes unreliable). table.unpack, select('#', ...).
Strings: string.upper(s) / s:upper(), s:lower(), s:sub(1, 3), s:len(), s:find("x", 1, true), s:match("%d+"), s:gsub("a", "b"), s:gmatch("%a+"), s:rep(3), string.format("%s has %d hp (%.1f%%)", name, hp, pct), tostring/tonumber. Lua patterns use % (not \\): %d digit, %a letter, %s space, %w alnum, . any, *, +, -, ?, ^ $ anchors.
Functions: local function add(a, b) return a + b end; multiple returns: return a, b; varargs function f(...) local args = {...} end; closures; default values: name = name or "anon".
Error handling: local ok, err = pcall(riskyFunction, arg); error("message", 2); assert(cond, "msg").
OOP with metatables:
local Animal = {}; Animal.__index = Animal
function Animal.new(name) return setmetatable({ name = name }, Animal) end
function Animal:speak() print(self.name .. " makes a sound") end   -- : passes self
local a = Animal.new("Rex"); a:speak()
Metamethods: __index, __newindex, __add, __eq, __lt, __tostring, __call, __len.
Modules: local M = {}; function M.hello() end; return M → local mod = require("mod"). Lua is used in Roblox (Luau), LÖVE 2D games, Neovim configs, WoW addons, Garry's Mod, FiveM, Redis scripting.`),

  c('roblox-luau', 'Roblox Luau scripting: services, Players, events, RemoteEvents, DataStores, server vs client', ['roblox script', 'roblox lua', 'luau', 'roblox studio', 'remoteevent', 'roblox datastore', 'local script vs script', 'roblox touched event', 'roblox leaderstats', 'roblox tween', 'game getservice'],
    `Script types: Script (server — ServerScriptService), LocalScript (client — StarterPlayerScripts, StarterGui, StarterCharacterScripts), ModuleScript (shared code, require()). Never trust the client: money, damage, inventory are decided on the server.
Services: local Players = game:GetService("Players"); ReplicatedStorage, ServerStorage, RunService, TweenService, UserInputService, DataStoreService, Debris, CollectionService.
Leaderstats (server):
Players.PlayerAdded:Connect(function(player)
    local stats = Instance.new("Folder"); stats.Name = "leaderstats"; stats.Parent = player
    local coins = Instance.new("IntValue"); coins.Name = "Coins"; coins.Value = 0; coins.Parent = stats
end)
Touch part to give coins (server, with debounce):
local part = script.Parent; local cooldown = {}
part.Touched:Connect(function(hit)
    local player = Players:GetPlayerFromCharacter(hit.Parent)
    if not player or cooldown[player] then return end
    cooldown[player] = true
    player.leaderstats.Coins.Value += 10
    task.wait(1); cooldown[player] = nil
end)
Client → server: RemoteEvent in ReplicatedStorage. Client: remote:FireServer(itemId). Server: remote.OnServerEvent:Connect(function(player, itemId) -- validate itemId, check price/distance, then act end). Server → client: remote:FireClient(player, data) / FireAllClients. RemoteFunction:InvokeServer for request/response (never InvokeClient from the server).
Character: player.CharacterAdded:Connect(function(char) local hum = char:WaitForChild("Humanoid"); hum.WalkSpeed = 24; hum.Died:Connect(...) end). Local player (client): Players.LocalPlayer.
Use WaitForChild for things that replicate/load; FindFirstChild returns nil instead of erroring. task.wait / task.spawn / task.delay instead of wait/spawn/delay (deprecated).
Tweens: TweenService:Create(part, TweenInfo.new(1, Enum.EasingStyle.Quad), { Position = part.Position + Vector3.new(0, 5, 0) }):Play().
Input (client): UserInputService.InputBegan:Connect(function(input, gp) if gp then return end if input.KeyCode == Enum.KeyCode.E then ... end end); ContextActionService for mobile buttons; ProximityPrompt.Triggered for "press E" interactions.
DataStores (server, enable API access in Game Settings to test in Studio):
local store = DataStoreService:GetDataStore("PlayerData")
local ok, data = pcall(function() return store:GetAsync("u_" .. player.UserId) end)
save on PlayerRemoving and game:BindToClose with pcall(store.SetAsync / UpdateAsync, ...); limit request rates; ProfileStore/ProfileService for session locking.
GUI: ScreenGui in StarterGui; TextButton.Activated:Connect(...); TextLabel.Text = "Coins: " .. n. Vectors: Vector3.new, CFrame.new(pos) * CFrame.Angles(0, math.rad(90), 0), part.CFrame = CFrame.lookAt(a, b). Raycast: workspace:Raycast(origin, direction, RaycastParams.new()).
Luau extras: type annotations (local function add(a: number, b: number): number), --!strict, compound operators (+=), string interpolation \`Hi {player.Name}\`, continue in loops.
Common errors: "attempt to index nil with 'X'" (object not found yet → WaitForChild, or wrong path), "Infinite yield possible" (WaitForChild name typo/never exists), LocalScript not running (wrong container, e.g. in Workspace), changes made on the client not showing for others (FilteringEnabled — do it on the server), "DataStore request was added to queue" (too many requests).`),
];
