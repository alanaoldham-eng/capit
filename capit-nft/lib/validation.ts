import { z } from "zod";

export const pluggedWellSchema = z.object({
  apiNumber: z.string().min(3),
  state: z.string().min(2).max(2),
  county: z.string().min(1),
  operator: z.string().min(1),
  plugDate: z.string().date(),
  sourceUrl: z.string().url(),
  latitude: z.coerce.number().min(-90).max(90).optional(),
  longitude: z.coerce.number().min(-180).max(180).optional(),
  pluggingCostEstimateUsd: z.coerce.number().nonnegative().optional(),
  methaneReductionEstimateTonsCo2e: z.coerce.number().nonnegative().optional(),
  depthFeet: z.coerce.number().nonnegative().optional(),
  isOffshore: z.coerce.boolean().optional(),
  isLaunchBatch: z.coerce.boolean().optional(),
  notes: z.string().optional()
});

export const mintBatchSchema = z.array(pluggedWellSchema).min(1).superRefine((wells, ctx) => {
  const seen = new Set<string>();
  wells.forEach((well, index) => {
    const key = `${well.state.toUpperCase()}:${well.apiNumber}`;
    if (seen.has(key)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Duplicate API number in batch: ${key}`, path: [index, "apiNumber"] });
    }
    seen.add(key);
  });
});
