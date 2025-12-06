import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY, Role } from "../decorators/roles.decorators";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflactor: Reflector){
    }
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflactor.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log('Required roles:', requiredRoles);

    if (!requiredRoles) {
      console.log('No roles required, access granted');
      return true;
    }
        

        const {user} = context.switchToHttp().getRequest();
        return requiredRoles.some((role)=>user.role === role);
    }

}