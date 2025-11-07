import { z } from "zod";
import { useQueryValidated } from "./useQueryValidated";
import { useMutationValidated } from "./useMutationValidated";
import {
  AgentSchema,
  CreateAgentSchema,
  type Agent,
  type CreateAgentData,
} from "@/lib/schemas";
import { api } from "@/lib/apiClient";

// API returns list of agents
export const AgentListSchema = z.array(AgentSchema);

// --- GET all agents ---
export function useAgents() {
  return useQueryValidated<Agent[]>(
    ["agents"],
    "/agents/",
    AgentListSchema
  );
}

// --- CREATE agent ---
export function useCreateAgent() {
  return useMutationValidated<CreateAgentData, Agent>(
    "/agents/",
    AgentSchema,
    "post",
    {
      onSuccess: () => {
        console.log("✅ Agent created successfully");
      },
    }
  );
}

// --- DELETE agent ---
export function useDeleteAgent() {
  return useMutationValidated<{ id: number }, { success: boolean }>(
    "/agents/delete/",
    z.object({ success: z.boolean() }),
    "delete"
  );
}
