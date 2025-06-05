import { HealthResponse } from "@backend/health/healthResponse.dto";
import { Controller, Get } from "@nestjs/common";

@Controller({ version: '1', path: 'health' })
export class HealthController {
    @Get()
    get(): HealthResponse {
        return {
            status: 'ok'
        }
    }
}
